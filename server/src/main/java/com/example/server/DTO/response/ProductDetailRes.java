package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Map;
@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class ProductDetailRes {
    private Long id;
    private String name;
    private Integer sellingPrice;
    private Integer originalPrice;
    private String image;
    private String description;
    private String productType;
    private String brand; 
    private Map<String, Object> productSpecs;
    private Map<String, Object> headphoneSpecs;
}

