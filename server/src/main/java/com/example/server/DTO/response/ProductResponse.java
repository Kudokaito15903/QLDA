package com.example.server.dto.response;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private Long sellingPrice;
    private Long originalPrice;
    private String image;
    private String description;
    private Integer sold;
    private String productType;
    private String brand;
    private Date createdDate;
    private Object productSpecs; // Could be ProductInfo or HeadphoneInfo

}
