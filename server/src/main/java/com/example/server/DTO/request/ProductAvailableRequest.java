package com.example.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ProductAvailableRequest {
    private Long id;
    private Long productId;
    private Integer available;
    private String color;
}