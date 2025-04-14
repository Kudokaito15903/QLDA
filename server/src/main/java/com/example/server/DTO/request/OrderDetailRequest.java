package com.example.server.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailRequest {
    @NotNull Long orderId;
    @NotNull Long productId;
    @NotBlank String productName;
    @NotBlank String color;
    @NotNull @Min(1) Integer quantity;
    @NotNull Integer price;
}
