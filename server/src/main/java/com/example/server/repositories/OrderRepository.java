package com.example.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.server.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long>{
    Page<Order> findByFullnameContaining(String fullname, Pageable pageable);
    Page<Order> findByStatusContaining(String status, Pageable pageable);
    Page<Order> findAllById(Long id, Pageable pageable);
    Page<Order> findByTotalPrice(Integer totalPrice, Pageable pageable);
    
}
