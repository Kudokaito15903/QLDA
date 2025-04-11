package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.entity.ProductAvailable;
@Repository
public interface ProductAvailableRepository extends JpaRepository<ProductAvailable, Long>{
    
}
