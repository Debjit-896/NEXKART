package com.debjit.nexkart_auth.repositories;

import com.debjit.nexkart_auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUserIdAndToken(UUID userId, String token);
    void deleteByUserIdAndRevokedFalse(UUID userId);
}