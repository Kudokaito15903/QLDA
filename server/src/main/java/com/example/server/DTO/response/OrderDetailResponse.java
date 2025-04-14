package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponse {
    private Long id;
    private String productName;
    private String color;
    private Integer quantity;
    private Integer price;
    private Long productId;
    private Long orderId;
    private String productImage;
}
