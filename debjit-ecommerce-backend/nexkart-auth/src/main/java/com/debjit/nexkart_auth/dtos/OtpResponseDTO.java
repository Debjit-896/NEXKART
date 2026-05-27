package com.debjit.nexkart_auth.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpResponseDTO {
    private Boolean success;
    private String message;
    private String contact;
    private Integer expiresIn;
}