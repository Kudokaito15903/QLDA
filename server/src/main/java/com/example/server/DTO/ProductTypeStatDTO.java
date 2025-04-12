package com.example.server.dto;

public class ProductTypeStatDTO {
    private String productType;
    private Long totalSold;

    public ProductTypeStatDTO(String productType, Long totalSold) {
        this.productType = productType;
        this.totalSold = totalSold;
    }

    // Getters and Setters
    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public Long getTotalSold() {
        return totalSold;
    }

    public void setTotalSold(Long totalSold) {
        this.totalSold = totalSold;
    }
}

