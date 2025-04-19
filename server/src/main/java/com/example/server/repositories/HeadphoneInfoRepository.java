package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.server.entity.HeadphoneInfo;
import java.util.Optional;
@Repository
public interface HeadphoneInfoRepository extends JpaRepository<HeadphoneInfo, Long> {
    @Query("SELECT h FROM HeadphoneInfo h WHERE h.product.id = :id")
    Optional<HeadphoneInfo> findByProductId(Long id);
    
}
