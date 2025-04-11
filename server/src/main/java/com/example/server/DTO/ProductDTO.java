package com.example.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductDTO {
    private Integer id;
    private String productID;
    private String name;
    private Long sellingPrice;
    private Long originalPrice;
    private String image;
    private String image1;
    private String image2;
    private String description;
    private Integer sold;
    private String brand;
    private String productType;
    private Date createdDate;
}
