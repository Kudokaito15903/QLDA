package com.example.server.entity;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;

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
@Table(name = "product")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Integer id;

    @Column(name = "productID")
    private String productID;

    @Column(name = "name")
    private String name;

    @Column(name = "selling_price")
    private Long sellingPrice;

    @Column(name = "original_price")
    private Long originalPrice;

    @Column(name ="image")
    private String image;

    @Column(name ="image1")
    private String image1;

    @Column(name ="image2")
    private String image2;

    @Column(name = "description")
    private String description;

    @Column(name = "sold")
    private Integer sold;

    @Column(name ="product_type")
    private String productType;

    @Column(name ="brand")
    private String brand;

    @CreatedDate
    @Column(name ="created_date")
    private Date createdDate;
}
