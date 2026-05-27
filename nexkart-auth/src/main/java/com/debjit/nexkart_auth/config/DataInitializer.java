package com.debjit.nexkart_auth.config;

import com.debjit.nexkart_auth.entity.Role;
import com.debjit.nexkart_auth.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
    }

    private void initializeRoles() {
        // Check if ROLE_USER exists
        if (roleRepository.findByName(Role.RoleName.ROLE_USER).isEmpty()) {
            Role userRole = Role.builder()
                    .name(Role.RoleName.ROLE_USER)
                    .build();
            roleRepository.save(userRole);
            log.info("ROLE_USER created successfully");
        } else {
            log.info("ROLE_USER already exists");
        }

        // Check if ROLE_ADMIN exists
        if (roleRepository.findByName(Role.RoleName.ROLE_ADMIN).isEmpty()) {
            Role adminRole = Role.builder()
                    .name(Role.RoleName.ROLE_ADMIN)
                    .build();
            roleRepository.save(adminRole);
            log.info("ROLE_ADMIN created successfully");
        } else {
            log.info("ROLE_ADMIN already exists");
        }
    }
}