package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderDetailDTO {

   private Integer id;

   private String productID;
   
   private String productName;

   private String color;

   private String orderID;

   private Integer price;

   private Integer quantity;
}
