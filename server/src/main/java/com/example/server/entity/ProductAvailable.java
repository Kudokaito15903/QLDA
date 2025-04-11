package com.example.server.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "product_available")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductAvailable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Integer id;
    @Column(name = "product_id")
    private String productID;

    @Column(name = "available")
    private Integer available;

    @Column(name = "color")
    private String color;
}
