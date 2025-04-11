package com.example.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductInfoDTO {
    private Integer id;
    private String productID;
    private String CPU;
    private String RAM;
    private String hardDrive;
    private String GPU;
    private String Display;
    private String battery;
}
