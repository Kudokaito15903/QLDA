package com.example.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePassword {
    @NotBlank
    @NotNull(message = "Password is required")
    @Min(value = 6, message = "Password must be at least 8 characters long")
    private String password;
    @NotBlank
    @NotNull(message = "Repeat password is required")
    @Min(value = 6, message = "Password must be at least 8 characters long")
    private String repeatPassword;
}

