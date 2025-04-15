package com.example.server.dto.request;

import java.util.Map;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductRequest {

    @NotBlank
    private String name;
    
    @NotNull @Min(0)
    private Integer sellingPrice;
    
    @NotNull @Min(0)
    private Integer originalPrice;
    
    private String image;
    private String description;
    
    @NotBlank
    private String productType;
        
    @NotBlank
    private String brand; 
    
    private Map<String, Object> productSpecs;
    private Map<String, Object> headphoneSpecs;
}
