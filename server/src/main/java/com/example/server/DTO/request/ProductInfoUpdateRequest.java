package com.example.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoUpdateRequest {
    @NotBlank
    private String CPU;
    
    @NotBlank
    private String RAM;
    
    @NotBlank
    private String hardDrive;
    
    private String GPU;
    private String Display;
    private String battery;
}
