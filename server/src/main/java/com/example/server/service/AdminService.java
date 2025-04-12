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
        log.info("Admin login successful: {}", username);
        return admin.get();
    }
}