package com.debjit.nexkart_auth.controllers;

import com.debjit.nexkart_auth.dtos.ApiResponseDTO;
import com.debjit.nexkart_auth.dtos.AuthResponseDTO;
import com.debjit.nexkart_auth.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponseDTO<?>> getCurrentUser() {
        log.info("Get current user endpoint called");
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var user = userService.getUserByEmail(email);

        AuthResponseDTO.UserDTO userDTO = AuthResponseDTO.UserDTO.builder()
                .id(user.getId().toString())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .contactNumber(user.getContactNumber())
                .gender(user.getGender().toString())
                .isEmailVerified(user.getIsEmailVerified())
                .isPhoneVerified(user.getIsPhoneVerified())
                .build();

        return ResponseEntity.ok(ApiResponseDTO.success("User retrieved successfully", userDTO));
    }
}