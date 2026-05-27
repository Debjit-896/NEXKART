package com.debjit.nexkart_auth.controllers;

import com.debjit.nexkart_auth.dtos.*;
import com.debjit.nexkart_auth.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponseDTO<?>> signup(
            @Valid @RequestBody SignUpRequestDTO signUpRequestDTO) {
        log.info("Signup endpoint called");
        AuthResponseDTO authResponse = userService.signup(signUpRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.success("User registered successfully", authResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<?>> login(
            @Valid @RequestBody AuthRequestDTO authRequestDTO) {
        log.info("Login endpoint called");
        AuthResponseDTO authResponse = userService.login(authRequestDTO);
        return ResponseEntity.ok(ApiResponseDTO.success("Login successful", authResponse));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponseDTO<?>> refreshToken(
            @RequestHeader("Authorization") String authHeader) {
        log.info("Refresh token endpoint called");
        String refreshToken = authHeader.substring(7); // Remove "Bearer "
        AuthResponseDTO authResponse = userService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponseDTO.success("Token refreshed successfully", authResponse));
    }

    @PostMapping("/forgot-password/request")
    public ResponseEntity<ApiResponseDTO<?>> requestPasswordResetOtp(
            @Valid @RequestBody ForgotPasswordRequestDTO forgotPasswordRequestDTO) {
        log.info("Request password reset OTP endpoint called");
        OtpResponseDTO response = userService.requestPasswordResetOtp(forgotPasswordRequestDTO);
        return ResponseEntity.ok(ApiResponseDTO.success("OTP sent successfully", response));
    }

    @PostMapping("/forgot-password/verify")
    public ResponseEntity<ApiResponseDTO<?>> verifyPasswordResetOtp(
            @Valid @RequestBody VerifyOtpRequestDTO verifyOtpRequestDTO) {
        log.info("Verify password reset OTP endpoint called");
        if (!"PASSWORD_RESET".equals(verifyOtpRequestDTO.getOtpType())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponseDTO.error("Invalid OTP type", "INVALID_OTP_TYPE"));
        }
        // Call dedicated password-reset verify method
        OtpResponseDTO response = userService.verifyPasswordResetOtp(verifyOtpRequestDTO);
        return ResponseEntity.ok(ApiResponseDTO.success("OTP verified successfully", response));
    }

    @PostMapping("/forgot-password/reset")
    public ResponseEntity<ApiResponseDTO<?>> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDTO resetPasswordRequestDTO) {
        log.info("Reset password endpoint called");
        OtpResponseDTO response = userService.resetPassword(resetPasswordRequestDTO);
        return ResponseEntity.ok(ApiResponseDTO.success("Password reset successfully", response));
    }

    @PostMapping("/verify-account-otp/request")
    public ResponseEntity<ApiResponseDTO<?>> requestAccountVerificationOtp(
            @Valid @RequestBody ForgotPasswordRequestDTO request) {
        log.info("Request account verification OTP endpoint called");
        OtpResponseDTO response = userService.requestVerificationOtp(request.getEmailOrPhone());
        return ResponseEntity.ok(ApiResponseDTO.success("OTP sent successfully", response));
    }

    @PostMapping("/verify-account-otp/verify")
    public ResponseEntity<ApiResponseDTO<?>> verifyAccountOtp(
            @Valid @RequestBody VerifyOtpRequestDTO verifyOtpRequestDTO) {
        log.info("Verify account OTP endpoint called");
        if (!verifyOtpRequestDTO.getOtpType().equals("ACCOUNT_VERIFICATION")) {
            return ResponseEntity.badRequest()
                    .body(ApiResponseDTO.error("Invalid OTP type", "INVALID_OTP_TYPE"));
        }
        OtpResponseDTO response = userService.verifyAccountOtp(verifyOtpRequestDTO);
        return ResponseEntity.ok(ApiResponseDTO.success("Account verified successfully", response));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponseDTO<?>> healthCheck() {
        return ResponseEntity.ok(ApiResponseDTO.success("Auth service is running", null));
    }
}