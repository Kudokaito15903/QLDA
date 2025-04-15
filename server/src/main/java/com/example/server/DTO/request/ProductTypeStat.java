package com.example.server.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
@Setter
@Getter
@NoArgsConstructor
@Builder
public class ProductTypeStat {
    private String productType;
    private Long totalSold;

    public ProductTypeStat(String productType, Long totalSold) {
        this.productType = productType;
        this.totalSold = totalSold;
    }
}