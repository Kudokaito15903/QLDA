package com.example.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import com.example.server.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // @Query("SELECT new com.example.server.DTO.ProductTypeStatDTO(p.productType, SUM(p.sold)) " +
    //        "FROM Product p GROUP BY p.productType")
    // List<ProductTypeStatDTO> findProductTypeStats();
    
    Page<Product> findByNameContaining(String name, Pageable pageable);
    Page<Product> findByProductTypeContaining(String brand, Pageable pageable);
    Page<Product> findBySellingPrice(Long sellingPrice, Pageable pageable);
    Page<Product> findByProductIDContaining(String productID, Pageable pageable);
}

