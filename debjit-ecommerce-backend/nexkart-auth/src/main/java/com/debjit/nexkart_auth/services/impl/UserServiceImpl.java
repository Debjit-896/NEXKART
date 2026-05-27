package com.debjit.nexkart_auth.services.impl;

import com.debjit.nexkart_auth.dtos.*;
import com.debjit.nexkart_auth.entity.*;
import com.debjit.nexkart_auth.entity.enums.UserStatus;
import com.debjit.nexkart_auth.exceptions.AuthException;
import com.debjit.nexkart_auth.exceptions.InvalidOtpException;
import com.debjit.nexkart_auth.exceptions.ResourceNotFoundException;
import com.debjit.nexkart_auth.repositories.*;
import com.debjit.nexkart_auth.services.UserService;
import com.debjit.nexkart_auth.utility.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OtpTokenRepository otpTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final LoginAuditLogRepository loginAuditLogRepository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final OtpGenerator otpGenerator;
    private final EmailService emailService;

    private static final String PHONE_REGEX = "^\\+?[1-9]\\d{1,14}$";
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";

    /**
     * SIGNUP - Only stores user data, NO OTP sent
     * User needs to call requestVerificationOtp() separately
     */
    @Override
    public AuthResponseDTO signup(SignUpRequestDTO signUpRequestDTO) {
        log.info("Signup request received for email: {}", signUpRequestDTO.getEmail());

        // Check if user already exists
        if (userRepository.existsByEmail(signUpRequestDTO.getEmail())) {
            throw new AuthException("Email already registered", "EMAIL_ALREADY_EXISTS");
        }

        if (userRepository.existsByContactNumber(signUpRequestDTO.getContactNumber())) {
            throw new AuthException("Contact number already registered", "CONTACT_ALREADY_EXISTS");
        }

        // Create new user - Status: PENDING_VERIFICATION (not active until email/phone verified)
        User user = User.builder()
                .fullName(signUpRequestDTO.getFullName())
                .email(signUpRequestDTO.getEmail())
                .contactNumber(signUpRequestDTO.getContactNumber())
                .passwordHash(passwordEncoder.encode(signUpRequestDTO.getPassword()))
                .gender(signUpRequestDTO.getGender())
                .dateOfBirth(signUpRequestDTO.getDateOfBirth())
                .isTermsAccepted(signUpRequestDTO.getTermsAccepted())
                .status(UserStatus.PENDING_VERIFICATION)
                .build();

        // Assign default role
        Role userRole = roleRepository.findByName(Role.RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        user.getRoles().add(userRole);

        user = userRepository.save(user);
        log.info("User created successfully with ID: {} - No OTP sent yet", user.getId());

        // Generate tokens (user can login before email verification)
        Collection<String> roleNames = user.getRoles().stream()
                .map(role -> role.getName().toString())
                .collect(Collectors.toList());

        String accessToken = jwtTokenProvider.generateAccessTokenFromEmail(user.getEmail(), roleNames);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

        // Save refresh token
        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .user(user)
                .token(refreshToken)
                .expiresAt(Instant.now().plusSeconds(604800))
                .build();
        refreshTokenRepository.save(refreshTokenEntity);

        return buildAuthResponse(user, accessToken, refreshToken);
    }

    @Override
    public AuthResponseDTO login(AuthRequestDTO authRequestDTO) {
        log.info("Login request received for email: {}", authRequestDTO.getEmail());

        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequestDTO.getEmail(),
                        authRequestDTO.getPassword()
                )
        );

        User user = userRepository.findByEmail(authRequestDTO.getEmail())
                .orElseThrow(() -> new AuthException("User not found", "USER_NOT_FOUND"));

        // Check if user is active
        if (user.getStatus() != UserStatus.ACTIVE && user.getStatus() != UserStatus.PENDING_VERIFICATION) {
            throw new AuthException("User account is inactive", "USER_INACTIVE");
        }

        // Log login
        LoginAuditLog auditLog = LoginAuditLog.builder()
                .user(user)
                .loginMethod("EMAIL_PASSWORD")
                .success(true)
                .build();
        loginAuditLogRepository.save(auditLog);

        user.setLastLoginAt(Instant.now());
        userRepository.save(user);

        // Generate tokens
        Collection<String> roleNames = user.getRoles().stream()
                .map(role -> role.getName().toString())
                .collect(Collectors.toList());

        String accessToken = jwtTokenProvider.generateAccessTokenFromEmail(user.getEmail(), roleNames);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

        // Save refresh token
        RefreshToken refreshTokenEntity = RefreshToken.builder()
                .user(user)
                .token(refreshToken)
                .expiresAt(Instant.now().plusSeconds(604800))
                .build();
        refreshTokenRepository.save(refreshTokenEntity);

        log.info("User logged in successfully: {}", user.getEmail());
        return buildAuthResponse(user, accessToken, refreshToken);
    }

    @Override
    public AuthResponseDTO refreshToken(String refreshToken) {
        log.info("Refresh token request received");

        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new AuthException("Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");
        }

        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        RefreshToken tokenEntity = refreshTokenRepository.findByUserIdAndToken(user.getId(), refreshToken)
                .orElseThrow(() -> new AuthException("Refresh token not found", "REFRESH_TOKEN_NOT_FOUND"));

        if (!tokenEntity.isValid()) {
            throw new AuthException("Refresh token is invalid or expired", "REFRESH_TOKEN_INVALID");
        }

        // Revoke old token
        tokenEntity.setRevoked(true);
        tokenEntity.setRevokedAt(Instant.now());
        refreshTokenRepository.save(tokenEntity);

        // Generate new tokens
        Collection<String> roleNames = user.getRoles().stream()
                .map(role -> role.getName().toString())
                .collect(Collectors.toList());

        String newAccessToken = jwtTokenProvider.generateAccessTokenFromEmail(user.getEmail(), roleNames);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

        // Save new refresh token
        RefreshToken newTokenEntity = RefreshToken.builder()
                .user(user)
                .token(newRefreshToken)
                .expiresAt(Instant.now().plusSeconds(604800))
                .build();
        refreshTokenRepository.save(newTokenEntity);

        return buildAuthResponse(user, newAccessToken, newRefreshToken);
    }

    /**
     * REQUEST VERIFICATION OTP - Sends OTP via Email or SMS
     * User provides email or phone number in payload
     */
    @Override
    public OtpResponseDTO requestVerificationOtp(String emailOrPhone) {
        log.info("Request verification OTP for: {}", emailOrPhone);

        String contactInput = emailOrPhone.trim();
        // Find user by phone or email
        User user = userRepository.findByEmailOrPhone(contactInput)
                .orElseThrow(() -> {
                    log.warn("User not found for contact: {}", contactInput);
                    return new ResourceNotFoundException("User not found with email or phone: " + contactInput, "USER_NOT_FOUND");
                });

        // If email already verified, return early
        if (user.getIsEmailVerified()) {
            throw new AuthException("Email already verified", "EMAIL_ALREADY_VERIFIED");
        }

        String otp = otpGenerator.generateOtp();

        // Save OTP linked to user; store contact as user's email
        String userEmail = user.getEmail();
        OtpToken otpToken = OtpToken.builder()
                .user(user)
                .code(otp)
                .contact(userEmail)
                .otpType(OtpToken.OtpType.ACCOUNT_VERIFICATION)
                .expiresAt(Instant.now().plusSeconds(600)) // 10 minutes
                .build();
        otpTokenRepository.save(otpToken);

        // Send OTP only via email
        try {
            log.info("Sending verification OTP to email: {}", userEmail);
            emailService.sendVerificationOtp(userEmail, user.getFullName(), otp);
        } catch (Exception e) {
            log.error("Failed to send verification OTP to {}: {}", userEmail, e.getMessage(), e);
            throw new AuthException("Failed to send OTP: " + e.getMessage(), "OTP_SEND_FAILED");
        }

        return OtpResponseDTO.builder()
                .success(true)
                .message("OTP sent to registered email")
                .contact(maskContact(userEmail))
                .expiresIn(600)
                .build();
    }

    /**
     * VERIFY ACCOUNT OTP - Verifies OTP and marks account as verified
     * After this, user account is fully active
     */
    @Override
    public OtpResponseDTO verifyAccountOtp(VerifyOtpRequestDTO verifyOtpRequestDTO) {
        log.info("Verify account OTP for: {}", verifyOtpRequestDTO.getEmailOrPhone());

        String contactInput = verifyOtpRequestDTO.getEmailOrPhone().trim();
        User user = userRepository.findByEmailOrPhone(contactInput)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "USER_NOT_FOUND"));

        // Find OTP by user id, not by raw contact string
        OtpToken otpToken = otpTokenRepository
                .findByUserIdAndCodeAndOtpType(user.getId(), verifyOtpRequestDTO.getOtp(), OtpToken.OtpType.ACCOUNT_VERIFICATION)
                .orElseThrow(() -> new InvalidOtpException("Invalid OTP", "INVALID_OTP"));

        if (!otpToken.isValid()) {
            throw new InvalidOtpException("OTP has expired or already used", "OTP_EXPIRED");
        }

        // Mark OTP used
        otpToken.setIsUsed(true);
        otpToken.setUsedAt(Instant.now());
        otpTokenRepository.save(otpToken);

        // Mark email verified
        user.setIsEmailVerified(true);
        // Decide account activation policy (here we mark ACTIVE when email verified)
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);

        return OtpResponseDTO.builder()
                .success(true)
                .message("OTP verified successfully - Account activated")
                .contact(user.getEmail())
                .build();
    }

    /**
     * REQUEST PASSWORD RESET OTP - Sends OTP for password reset
     */
    @Override
    public OtpResponseDTO requestPasswordResetOtp(ForgotPasswordRequestDTO forgotPasswordRequestDTO) {
        log.info("Request password reset OTP for: {}", forgotPasswordRequestDTO.getEmailOrPhone());

        String contactInput = forgotPasswordRequestDTO.getEmailOrPhone().trim();
        User user = userRepository.findByEmailOrPhone(contactInput)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "USER_NOT_FOUND"));

        String otp = otpGenerator.generateOtp();

        // Save OTP with contact = user's email
        String userEmail = user.getEmail();
        OtpToken otpToken = OtpToken.builder()
                .user(user)
                .code(otp)
                .contact(userEmail)
                .otpType(OtpToken.OtpType.PASSWORD_RESET)
                .expiresAt(Instant.now().plusSeconds(600))
                .build();
        otpTokenRepository.save(otpToken);

        try {
            log.info("Sending password reset OTP to email: {}", userEmail);
            emailService.sendPasswordResetOtp(userEmail, user.getFullName(), otp);
        } catch (Exception e) {
            log.error("Failed to send password reset OTP to {}: {}", userEmail, e.getMessage(), e);
            throw new AuthException("Failed to send OTP: " + e.getMessage(), "OTP_SEND_FAILED");
        }

        return OtpResponseDTO.builder()
                .success(true)
                .message("OTP sent to registered email")
                .contact(maskContact(userEmail))
                .expiresIn(600)
                .build();
    }

    /**
     * RESET PASSWORD - Verifies OTP and resets password
     */
    @Override
    public OtpResponseDTO resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO) {
        log.info("Reset password for email/phone: {}", resetPasswordRequestDTO.getEmail());

        // Accept email OR phone in the request; find the user
        String contactInput = resetPasswordRequestDTO.getEmail().trim();
        User user = userRepository.findByEmailOrPhone(contactInput)
                .orElseThrow(() -> {
                    log.warn("User not found for contact: {}", contactInput);
                    return new ResourceNotFoundException("User not found", "USER_NOT_FOUND");
                });

        // Find OTP by user id, code, and PASSWORD_RESET type
        OtpToken otpToken = otpTokenRepository
                .findByUserIdAndCodeAndOtpType(user.getId(), resetPasswordRequestDTO.getOtp(), OtpToken.OtpType.PASSWORD_RESET)
                .orElseThrow(() -> {
                    log.warn("OTP not found for user {} with code {}", user.getId(), resetPasswordRequestDTO.getOtp());
                    return new InvalidOtpException("Invalid OTP", "INVALID_OTP");
                });

        // Check if OTP is still valid (not expired, not used)
        if (otpToken.getIsUsed()) {
            log.warn("OTP already used for user: {}", user.getEmail());
            throw new InvalidOtpException("OTP has already been used", "OTP_ALREADY_USED");
        }

        if (otpToken.isExpired()) {
            log.warn("OTP expired for user: {}", user.getEmail());
            throw new InvalidOtpException("OTP has expired", "OTP_EXPIRED");
        }

        // Mark OTP as USED (only here, not in verify)
        otpToken.setIsUsed(true);
        otpToken.setUsedAt(Instant.now());
        otpTokenRepository.save(otpToken);
        log.info("OTP marked as used for user: {}", user.getEmail());

        // Update password
        try {
            user.setPasswordHash(passwordEncoder.encode(resetPasswordRequestDTO.getNewPassword()));
            userRepository.save(user);
            log.info("Password reset successfully for user: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Error updating password for user {}: {}", user.getEmail(), e.getMessage(), e);
            throw new AuthException("Failed to reset password", "PASSWORD_RESET_FAILED");
        }

        return OtpResponseDTO.builder()
                .success(true)
                .message("Password reset successfully")
                .build();
    }

    @Override
    public OtpResponseDTO verifyPasswordResetOtp(VerifyOtpRequestDTO verifyOtpRequestDTO) {
        log.info("Verify password reset OTP for: {}", verifyOtpRequestDTO.getEmailOrPhone());

        String contactInput = verifyOtpRequestDTO.getEmailOrPhone().trim();

        // Find user by email or phone
        User user = userRepository.findByEmailOrPhone(contactInput)
                .orElseThrow(() -> {
                    log.warn("User not found for contact: {}", contactInput);
                    return new ResourceNotFoundException("User not found", "USER_NOT_FOUND");
                });

        // Find OTP by user id and code and specific OTP type PASSWORD_RESET
        OtpToken otpToken = otpTokenRepository
                .findByUserIdAndCodeAndOtpType(user.getId(), verifyOtpRequestDTO.getOtp(), OtpToken.OtpType.PASSWORD_RESET)
                .orElseThrow(() -> {
                    log.warn("OTP not found for user {} with code {}", user.getId(), verifyOtpRequestDTO.getOtp());
                    return new InvalidOtpException("Invalid OTP", "INVALID_OTP");
                });

        if (otpToken.getIsUsed()) {
            log.warn("OTP already used for user: {}", user.getEmail());
            throw new InvalidOtpException("OTP has already been used", "OTP_ALREADY_USED");
        }

        if (otpToken.isExpired()) {
            log.warn("OTP expired for user: {}", user.getEmail());
            throw new InvalidOtpException("OTP has expired", "OTP_EXPIRED");
        }

        // Just validate, DO NOT mark as used here
        // The resetPassword() method will mark it as used when password is actually updated
        log.info("OTP verified (not marked as used yet) for user: {}", user.getEmail());

        return OtpResponseDTO.builder()
                .success(true)
                .message("Password reset successfully")
                .contact(maskContact(user.getEmail()))
                .build();
    }

    @Override
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "USER_NOT_FOUND"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "USER_NOT_FOUND"));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ==================== HELPER METHODS ====================

    private String formatPhoneNumber(String phone) {
        // Remove any non-digit characters
        String digits = phone.replaceAll("[^0-9]", "");

        // If it's 10 digits, prepend +91
        if (digits.length() == 10) {
            return "+91" + digits;
        }

        // If it's already 12 digits with +91, return as is
        if (digits.length() == 12 && phone.startsWith("+91")) {
            return phone;
        }

        // Otherwise assume it's already properly formatted
        return phone;
    }

    private boolean isLikelyPhone(String contact) {
        // Remove spaces and special chars for checking
        String digits = contact.replaceAll("[^0-9]", "");
        // If it has 10 or 12 digits, it's likely a phone
        return digits.length() == 10 || digits.length() == 12;
    }

    private User findUserByEmailOrPhone(String emailOrPhone) {
        return userRepository.findByEmailOrContactNumber(emailOrPhone, emailOrPhone)
                .orElseThrow(() -> new ResourceNotFoundException("User not found", "USER_NOT_FOUND"));
    }

    private boolean isEmail(String contact) {
        return Pattern.matches(EMAIL_REGEX, contact);
    }

    private boolean isPhone(String contact) {
        return Pattern.matches(PHONE_REGEX, contact);
    }

    private String maskContact(String contact) {
        if (isEmail(contact)) {
            int atIndex = contact.indexOf('@');
            return contact.substring(0, 2) + "****" + contact.substring(atIndex);
        } else {
            return contact.substring(0, 2) + "****" + contact.substring(contact.length() - 3);
        }
    }



    private AuthResponseDTO buildAuthResponse(User user, String accessToken, String refreshToken) {
        Collection<String> roleNames = user.getRoles().stream()
                .map(role -> role.getName().toString())
                .collect(Collectors.toList());

        AuthResponseDTO.UserDTO userDTO = AuthResponseDTO.UserDTO.builder()
                .id(user.getId().toString())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .contactNumber(user.getContactNumber())
                .gender(user.getGender().toString())
                .isEmailVerified(user.getIsEmailVerified())
                .isPhoneVerified(user.getIsPhoneVerified())
                .roles(new ArrayList<>(roleNames))
                .createdAt(user.getCreatedAt())
                .build();

        return AuthResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtTokenProvider.getExpirationTime())
                .user(userDTO)
                .build();
    }
}