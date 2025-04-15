package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ProductInfoResponse  {
    private Long id;
    private Long productId;
    private String productName;
    private String CPU;
    private String RAM;
    private String hardDrive;
    private String GPU;
    private String Display;
    private String battery;
}
