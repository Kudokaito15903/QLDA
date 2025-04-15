package com.example.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AdminRequest {
    private String username;
    private String password;
}
