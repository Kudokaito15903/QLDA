package com.example.server.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.server.dto.request.OrderRequest;
import com.example.server.dto.response.OrderResponse;
public interface OrderService {
    List<OrderResponse> getAllOrders();
    Page<OrderResponse> findAllPage(Pageable pageable);
    Page<OrderResponse> findByFullnamePageable(String username, Pageable pageable);
    Page<OrderResponse> findByStatusPageable(String status, Pageable pageable);
    Page<OrderResponse> findByOrderIDPageable(Long orderID, Pageable pageable);
    Page<OrderResponse> findByTotalPricePageable(Integer totalPrice, Pageable pageable);
    OrderResponse getOrderById(Long id);
    OrderResponse createOrder(OrderRequest request);
    OrderResponse updateOrder(Long id, OrderRequest request);
    void deleteOrder(Long id);
    Page<OrderResponse> searchOrders(
        String username, 
        String status, 
        Long orderId, 
        Integer totalPrice,
        Pageable pageable
    );
    Map<String, Object> getTotalOrder();
    Map<String, Object> getTotalProfit();
}

