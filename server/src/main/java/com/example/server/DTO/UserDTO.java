package com.example.server.DTO;

import java.util.Date;

import com.example.server.common.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String fullname;
    private String username;
    private String phonenumber;
    private String address;
    private String email;
    private String password;
    private Gender gender; 
    private Date createdAt; 
}
