package com.example.server.mapper;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import com.example.server.DTO.AdminDTO;
import com.example.server.entity.Admin;


@Component
public class AdminMapper implements EntityMapper<Admin, AdminDTO> {
    @Override
    public AdminDTO toDto(Admin entity) {
        return AdminDTO.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .fullname(entity.getFullname())
                .password(entity.getPassword())
                .build();
    }

    @Override
    public Admin toEntity(AdminDTO dto) {
        return Admin.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .fullname(dto.getFullname())
                .password(dto.getPassword())
                .build();
    }

    @Override
    public List<Admin> toEntities(List<AdminDTO> dtos) {
        List<Admin> list = new ArrayList<>();
        dtos.forEach(dto -> {
            Admin admin = toEntity(dto);
            list.add(admin);
        });
        return list;
    }

    @Override
    public List<AdminDTO> toDtos(List<Admin> entities) {
        List<AdminDTO> list = new ArrayList<>();
        entities.forEach(entity -> {
            AdminDTO adminDTO = toDto(entity);
            list.add(adminDTO);
        });
        return list;
    }
}