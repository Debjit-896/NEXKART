package com.debjit.nexkart_auth.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "otp_tokens", indexes = {
        @Index(name = "idx_otp_user", columnList = "user_id"),
        @Index(name = "idx_otp_expires_at", columnList = "expires_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 6)
    private String code;

    @Column(nullable = false)
    private String contact;

    @Enumerated(EnumType.STRING)
    private OtpType otpType;

    @Builder.Default
    private Boolean isUsed = false;

    private Instant expiresAt;
    private Instant createdAt = Instant.now();
    private Instant usedAt;

    public enum OtpType {
        ACCOUNT_VERIFICATION,
        PASSWORD_RESET
    }

    // safe checks in OtpToken.java
    public boolean isExpired() {
        if (expiresAt == null) {
            // Treat missing expiry as expired to prevent accidental acceptance
            return true;
        }
        return Instant.now().isAfter(expiresAt);
    }

    public boolean isValid() {
        // handle nullable Boolean isUsed defensively
        boolean used = Boolean.TRUE.equals(isUsed);
        return !used && !isExpired();
    }
}