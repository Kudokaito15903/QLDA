package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.server.entity.HeadphoneInfo;
@Repository
public interface HeadphoneInfoRepository extends JpaRepository<HeadphoneInfo, Integer> {
    
}
