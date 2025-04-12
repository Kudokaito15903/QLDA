package com.example.server.dto.response;

import com.example.server.common.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Integer id;
    private String fullname;
    private String username;
    private String phonenumber;
    private String address;
    private String email;
    private Gender gender;
    private Date createdAt;
    private Date updatedAt;
    private Boolean isActive;
} 