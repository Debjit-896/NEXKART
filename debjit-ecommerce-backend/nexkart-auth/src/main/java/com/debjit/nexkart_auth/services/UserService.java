package com.debjit.nexkart_auth.services;

import com.debjit.nexkart_auth.dtos.*;
import com.debjit.nexkart_auth.entity.User;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    AuthResponseDTO signup(SignUpRequestDTO signUpRequestDTO);
    AuthResponseDTO login(AuthRequestDTO authRequestDTO);
    AuthResponseDTO refreshToken(String refreshToken);

    OtpResponseDTO requestVerificationOtp(String emailOrPhone);
    OtpResponseDTO verifyAccountOtp(VerifyOtpRequestDTO verifyOtpRequestDTO);

    OtpResponseDTO requestPasswordResetOtp(ForgotPasswordRequestDTO forgotPasswordRequestDTO);
    OtpResponseDTO resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO);
    OtpResponseDTO verifyPasswordResetOtp(VerifyOtpRequestDTO verifyOtpRequestDTO);
    User getUserById(UUID id);
    User getUserByEmail(String email);
    Optional<User> findByEmail(String email);
}