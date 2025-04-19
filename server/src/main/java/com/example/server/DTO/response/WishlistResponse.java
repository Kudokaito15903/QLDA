package com.example.server.dto.response;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder

public class WishlistResponse {
    private Long id;
    private Long productId; 
    private String userName;
    private String productName;
    private Integer productPrice;
    private String productImage;
}