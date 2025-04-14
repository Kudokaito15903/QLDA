package com.example.server.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.example.server.dto.request.OrderDetailRequest;
import com.example.server.dto.response.OrderDetailResponse;
import com.example.server.entity.Order;
import com.example.server.entity.OrderDetail;
import com.example.server.entity.Product;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repositories.OrderDetailRepository;
import com.example.server.repositories.OrderRepository;
import com.example.server.repositories.ProductRepository;
import com.example.server.service.OrderDetailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository; 
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    @Override
    public List<OrderDetailResponse> getAllOrderDetails(){
        return orderDetailRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }
    @Override
    public List<OrderDetailResponse> findByOrderID(Long orderId){
        return orderDetailRepository.findByOrderId(orderId).stream().map(this::toResponse).collect(Collectors.toList());
    }
    @Override
    public List<OrderDetailResponse> getOrderDetailsByProduct(Long productId){
        return orderDetailRepository.findByProductId(productId).stream().map(this::toResponse).collect(Collectors.toList());
    }
    @Override
    public void createOrderDetail(OrderDetailRequest request){
        Order order = orderRepository.findById(request.getOrderId())
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        Product product = productRepository.findById(request.getProductId())
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        OrderDetail orderDetail = OrderDetail.builder()
            .order(order)
            .product(product)
            .productName(request.getProductName())
            .color(request.getColor())
            .quantity(request.getQuantity())
            .price(request.getPrice())
            .build();
        orderDetailRepository.save(orderDetail);
    }
    @Override
    public void updateOrderDetail(Long id, OrderDetailRequest request){
        OrderDetail orderDetail = orderDetailRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("OrderDetail not found"));
        Order order = orderRepository.findById(request.getOrderId())
        .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        Product product = productRepository.findById(request.getProductId())
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setProductName(request.getProductName());
        orderDetail.setColor(request.getColor());
        orderDetail.setQuantity(request.getQuantity());
        orderDetail.setPrice(request.getPrice());
        orderDetailRepository.save(orderDetail);
    }
    @Override
    public void deleteOrderDetail(Long id){
        OrderDetail orderDetail = orderDetailRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("OrderDetail not found"));
        orderDetailRepository.delete(orderDetail);
    }
    @Override
    public OrderDetailResponse getDetailById(Long id){
        OrderDetail orderDetail = orderDetailRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("OrderDetail not found"));
        return toResponse(orderDetail);
    }
    private OrderDetailResponse toResponse(OrderDetail orderDetail){
        return OrderDetailResponse.builder()
        .orderId(orderDetail.getOrder().getId())
        .productId(orderDetail.getProduct().getId())
        .id(orderDetail.getId())
        .productName(orderDetail.getProductName())
        .color(orderDetail.getColor())
        .quantity(orderDetail.getQuantity())
        .price(orderDetail.getPrice())
        .productImage(orderDetail.getProduct().getImage())
        .build();
    }
    
}
