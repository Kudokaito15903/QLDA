package com.example.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.server.dto.request.OrderDetailRequest;
import com.example.server.dto.response.OrderDetailResponse;
public interface OrderDetailService {
    List<OrderDetailResponse> getAllOrderDetails();
    List<OrderDetailResponse> findByOrderID(Long orderId);
    List<OrderDetailResponse> getOrderDetailsByProduct(Long productId);
    OrderDetailResponse createOrderDetail(OrderDetailRequest request);
    OrderDetailResponse updateOrderDetail(Long id, OrderDetailRequest request);
    void deleteOrderDetail(Long id);
    OrderDetailResponse getDetailById(Long id);
}
