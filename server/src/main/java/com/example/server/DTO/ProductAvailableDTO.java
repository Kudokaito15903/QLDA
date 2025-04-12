package com.example.server.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class ProductAvailableDTO {
    private Integer id;
    private String productID;
    private Integer available;
    private String color;
}
