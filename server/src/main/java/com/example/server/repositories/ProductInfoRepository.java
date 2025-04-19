package com.example.server.repositories;
import org.springframework.stereotype.Repository;
import com.example.server.entity.ProductInfo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
@Repository
public interface ProductInfoRepository extends JpaRepository<ProductInfo, Long> {
    @Query("SELECT p FROM ProductInfo p WHERE p.product.id = :id")
    Optional<ProductInfo> findByProductId(Long id);

}
