package com.debjit.nexkart_auth.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyOtpRequestDTO {
    @NotBlank(message = "Email or phone cannot be blank")
    private String emailOrPhone;

    @NotBlank(message = "OTP cannot be blank")
    @Size(min = 6, max = 6, message = "OTP must be 6 digits")
    private String otp;

    @NotNull(message = "OTP Type cannot be null")
    private String otpType;
}