package com.example.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "product_info")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @Column(name ="CPU")
    private String CPU;

    @Column(name ="RAM")
    private String RAM;

    @Column(name = "hard_drive")
    private String hardDrive;

    @Column(name ="GPU")
    private String GPU;

    @Column(name = "Display")
    private String Display;

    @Column(name = "Battery")
    private String battery;
}
