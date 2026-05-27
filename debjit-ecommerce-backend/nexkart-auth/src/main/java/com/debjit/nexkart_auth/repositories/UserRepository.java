package com.debjit.nexkart_auth.repositories;

import com.debjit.nexkart_auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    Optional<User> findByContactNumber(String contactNumber);
    Optional<User> findByEmailOrContactNumber(String email, String contactNumber);
    boolean existsByEmail(String email);
    boolean existsByContactNumber(String contactNumber);

    // New helper - search by a single input that may be an email or phone
    @Query("SELECT u FROM User u WHERE u.email = :emailOrPhone OR u.contactNumber = :emailOrPhone")
    Optional<User> findByEmailOrPhone(@Param("emailOrPhone") String emailOrPhone);
}