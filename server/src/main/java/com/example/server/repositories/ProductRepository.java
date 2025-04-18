package com.example.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.example.server.entity.Product;
import com.example.server.dto.request.ProductTypeStat;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT new com.example.server.dto.request.ProductTypeStat(p.productType, SUM(p.sold)) " +
    "FROM Product p GROUP BY p.productType")
    List<ProductTypeStat> findProductTypeStats();
    @Query("SELECT p FROM Product p WHERE " +
    "(:name IS NULL OR UPPER(p.name) LIKE CONCAT('%', UPPER(:name), '%')) AND " +
    "(:productType IS NULL OR UPPER(p.productType) LIKE CONCAT('%', UPPER(:productType), '%')) AND " +
    "(:brand IS NULL OR UPPER(p.brand) LIKE CONCAT('%', UPPER(:brand), '%')) AND " +
    "(:sellingPrice IS NULL OR p.sellingPrice = :sellingPrice)")
    Page<Product> searchProducts(
        @Param("name") String name,
        @Param("productType") String productType,
        @Param("brand") String brand,
        @Param("sellingPrice") Long sellingPrice,
        Pageable pageable
    );
    Page<Product> findByNameContaining(String name, Pageable pageable);
    Page<Product> findByProductTypeContaining(String brand, Pageable pageable);
    Page<Product> findBySellingPrice(Long sellingPrice, Pageable pageable);
    Page<Product> findById(Long id, Pageable pageable);
    Page<Product> findByBrandContaining(String brand, Pageable pageable);
}

