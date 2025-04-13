package com.example.server.entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="order_detail")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrderDetail {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id")
   private Long id;
     
   @Column(name ="product_name")
   private String productName;

   @Column(name ="color")
   private String color;

   @Column(name ="quantity")
   private Integer quantity;

   @Column(name ="price")
   private Integer price;  
   @ManyToOne
   @JoinColumn(name = "product_id",nullable = false)
   private Product product;

   @ManyToOne
   @JoinColumn(name = "order_id",nullable = false)
   private Order order;
}
