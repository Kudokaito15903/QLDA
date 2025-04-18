package com.example.server.service;

import org.springframework.stereotype.Service;
import com.example.server.entity.Admin;
import com.example.server.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {
    private final AdminRepository adminRepository;

    public Admin login(String username, String password) {
        log.info("Attempting login for admin: {}", username);

        Optional<Admin> admin = adminRepository.findByUsername(username);
        
        if (admin.isEmpty()) {
            log.warn("Login failed: Admin with username {} not found", username);
        }
        if(admin.get().getPassword().equals(password)){
            log.info("Admin login successful: {}", username);
            return Admin.builder()
            .username(admin.get().getUsername())
            .password(admin.get().getPassword())
            .build();
        }
        else{
            log.warn("Login failed: Invalid password for admin: {}", username);
            throw new RuntimeException("Invalid password");
        }
    }
}