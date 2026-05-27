package com.debjit.nexkart_auth.dtos;

import lombok.*;
import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDTO {
    private String accessToken;
    private String refreshToken;

    @Builder.Default
    private String tokenType = "Bearer";

    private Long expiresIn;
    private UserDTO user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDTO {
        private String id;
        private String fullName;
        private String email;
        private String contactNumber;
        private String gender;
        private Boolean isEmailVerified;
        private Boolean isPhoneVerified;
        private List<String> roles;
        private Instant createdAt;
    }
}