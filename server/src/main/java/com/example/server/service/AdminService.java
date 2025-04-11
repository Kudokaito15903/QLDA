package com.example.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.server.DTO.AdminDTO;
import com.example.server.entity.Admin;
import com.example.server.mapper.AdminMapper;
import com.example.server.repositories.AdminRepository;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AdminService {
    private final AdminRepository adminRepository;
    private final AdminMapper adminMapper;

    public AdminDTO login(String username, String password){
        List<Admin> admins = adminRepository.findAll();
        List<AdminDTO> adminDTOs = adminMapper.toDtos(admins);
        return adminDTOs.stream().filter((admin) -> admin.getUsername().equals(username) && admin.getPassword().equals(password))
                .findFirst().orElse(null);
    }
}
