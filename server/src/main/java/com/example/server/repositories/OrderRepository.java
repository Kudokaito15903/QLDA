package com.example.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.server.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long>{
    Page<Order> findByFullnameContaining(String fullname, Pageable pageable);
    Page<Order> findByStatusContaining(String status, Pageable pageable);
    Page<Order> findByTotalPrice(Integer totalPrice, Pageable pageable);
    Page<Order> findByOrderID(Long orderID, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE " +
           "(:username IS NULL OR o.user.username LIKE CONCAT('%', :username, '%')) AND " +
           "(:status IS NULL OR o.status LIKE CONCAT('%', :status, '%')) AND " +
           "(:orderId IS NULL OR o.id = :orderId) AND " +
           "(:totalPrice IS NULL OR o.totalPrice = :totalPrice)")
    Page<Order> searchOrders(
        @Param("username") String username,
        @Param("status") String status,
        @Param("orderId") Long orderId,
        @Param("totalPrice") Integer totalPrice,
        Pageable pageable
    );
}
