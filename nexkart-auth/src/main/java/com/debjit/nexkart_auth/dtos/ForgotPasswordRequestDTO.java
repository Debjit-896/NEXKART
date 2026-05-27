package com.debjit.nexkart_auth.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForgotPasswordRequestDTO {
    @NotBlank(message = "Email or phone number cannot be blank")
    private String emailOrPhone;
}