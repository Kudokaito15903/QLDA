package com.example.server.repositories;
import org.springframework.stereotype.Repository;
import com.example.server.entity.ProductInfo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ProductInfoRepository extends JpaRepository<ProductInfo, Long> {
    Optional<ProductInfo> findByProductId(Long productId);

}
