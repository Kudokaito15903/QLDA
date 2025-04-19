package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.entity.ProductAvailable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
@Repository
public interface ProductAvailableRepository extends JpaRepository<ProductAvailable, Long>{
    @Query("SELECT pa FROM ProductAvailable pa WHERE pa.product.id = :productID")
    Page<ProductAvailable> findByProductId(Long productID, Pageable pageable);
}
