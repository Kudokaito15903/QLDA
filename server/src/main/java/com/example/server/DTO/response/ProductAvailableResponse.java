package com.example.server.dto.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ProductAvailableResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String color;
    private Integer available;
    private Date lastUpdated;
}