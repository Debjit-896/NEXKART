package com.debjit.nexkart_auth.repositories;

import com.debjit.nexkart_auth.entity.OtpToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OtpTokenRepository extends JpaRepository<OtpToken, UUID> {
    Optional<OtpToken> findByUserIdAndCodeAndOtpType(UUID userId, String code, OtpToken.OtpType otpType);
    Optional<OtpToken> findByContactAndCodeAndOtpType(
            String contact, String code, OtpToken.OtpType otpType
    );
}