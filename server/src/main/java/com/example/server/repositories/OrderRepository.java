package com.example.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.server.entity.Order;
import com.example.server.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long>{
    @Query("SELECT o FROM Order o WHERE o.user.fullname LIKE %:fullname%")
    Page<Order> findByFullnameContaining(@Param("fullname") String fullname, Pageable pageable);
    Page<Order> findByStatusContaining(String status, Pageable pageable);
    Page<Order> findByTotalPrice(Integer totalPrice, Pageable pageable);
    Page<Order> findById(Long id, Pageable pageable);
    @Query("SELECT o FROM Order o WHERE o.user.username LIKE %:username%")
    Page<Order> findByUsernameContaining(@Param("username") String username, Pageable pageable);
    @Query("SELECT o FROM Order o WHERE " +
           "(:username IS NULL OR o.user.username LIKE CONCAT('%', :username, '%')) OR " +
           "(:status IS NULL OR o.status LIKE CONCAT('%', :status, '%')) OR " +
           "(:orderId IS NULL OR o.id = :orderId) OR " +
           "(:totalPrice IS NULL OR o.totalPrice = :totalPrice)" )
    Page<Order> searchOrders(
        @Param("username") String username,
        @Param("status") String status,
        @Param("orderId") Long orderId,
        @Param("totalPrice") Integer totalPrice,
        Pageable pageable
    );
    // @Modifying
    // @Transactional
    // @Query("DELETE FROM Order o WHERE o.user = :user")
    // void deleteByUser(User user);
}
