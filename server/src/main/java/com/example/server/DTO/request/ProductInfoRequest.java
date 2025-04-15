package com.example.server.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoRequest  {
    @NotNull
    private Long productId;
    
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
