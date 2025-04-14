package com.example.server.service.impl;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.server.dto.request.OrderRequest;
import com.example.server.dto.response.OrderResponse;
import com.example.server.entity.Order;
import com.example.server.entity.User;
import com.example.server.repositories.OrderRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.service.OrderService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    
    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<OrderResponse> findAllPage(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(this::mapToOrderResponse);
    }

    @Override
    public Page<OrderResponse> findByFullnamePageable(String username, Pageable pageable) {
        return orderRepository.findByFullnameContaining(username, pageable)
                .map(this::mapToOrderResponse);
    }

    @Override
    public Page<OrderResponse> findByStatusPageable(String status, Pageable pageable) {
        return orderRepository.findByStatusContaining(status, pageable)
                .map(this::mapToOrderResponse);
    }

    @Override
    public Page<OrderResponse> findByOrderIDPageable(Long orderID, Pageable pageable) {
        try {
            return orderRepository.findByOrderID(orderID, pageable)
                    .map(this::mapToOrderResponse);
        } catch (NumberFormatException e) {
            return Page.empty(pageable);
        }
    }

    @Override
    public Page<OrderResponse> findByTotalPricePageable(Integer totalPrice, Pageable pageable) {
        return orderRepository.findByTotalPrice(totalPrice, pageable)
                .map(this::mapToOrderResponse);
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(this::mapToOrderResponse)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    }

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + request.getUserId()));
            
        Order order = Order.builder()
            .user(user)
            .totalPrice(request.getTotalPrice())
            .payment_method(request.getPaymentMethod())
            .paid(request.getPaid())
            .delivery_state("Pending")
            .status("Processing")
            .build();
        
        Order savedOrder = orderRepository.save(order);
        return mapToOrderResponse(savedOrder);
    }

    @Override
    public OrderResponse updateOrder(Long id, OrderRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
        
       
                if (request.getTotalPrice() != null) {
                    order.setTotalPrice(request.getTotalPrice());
                }
                if (request.getPaymentMethod() != null) {
                    order.setPayment_method(request.getPaymentMethod());
                }
                if (request.getPaid() != null) {
                    order.setPaid(request.getPaid());
                }
        
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new EntityNotFoundException("Order not found with id: " + id);
        }
        orderRepository.deleteById(id);
    }
    @Override
    public Page<OrderResponse> searchOrders(
        String username, 
        String status, 
        Long orderId, 
        Integer totalPrice,
        Pageable pageable
    ){
        return orderRepository.searchOrders(username, status, orderId, totalPrice, pageable)
                .map(this::mapToOrderResponse);
    }
    
    private OrderResponse mapToOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .username(order.getUser().getUsername())
                .status(order.getStatus())
                .fullname(order.getUser().getFullname())
                .phonenumber(order.getUser().getPhonenumber())
                .address(order.getUser().getAddress())
                .email(order.getUser().getEmail())
                .orderDate(order.getOrderDate())
                .totalPrice(order.getTotalPrice())
                .paymentMethod(order.getPayment_method())
                .paid(order.getPaid())
                .deliveryState(order.getDelivery_state())
                .userId(order.getUser().getId())
                .build();
    }
    
    @Override
    public Map<String, Object> getTotalOrder(){
        List<Order> orders = orderRepository.findAll();
        int totalOrder = orders.size();
        Map<String, Integer> totalOrderMap = new HashMap<>();
        for (Order order : orders){
            String orderDate = order.getOrderDate().toString();
            if (totalOrderMap.containsKey(orderDate)){
                totalOrderMap.put(orderDate, totalOrderMap.get(orderDate) + 1);
            }else{
                totalOrderMap.put(orderDate, 1);
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("total_order", totalOrder);
        result.put("order_by_days", totalOrderMap);
        return result;
    }
    @Override
    public Map<String, Object> getTotalProfit(){
        Map<String, Object> result = new HashMap<>();
        List<Order> orders = orderRepository.findAll();
        int totalProfit = 0;
        for (Order order : orders){
            totalProfit += order.getTotalPrice();
        }
        Map<String,Integer> profitByDays = new HashMap<>();
        for (Order order : orders){
            String orderDate = order.getOrderDate().toString();
            if (profitByDays.containsKey(orderDate)){
                profitByDays.put(orderDate, profitByDays.get(orderDate) + order.getTotalPrice());
            }else{
                profitByDays.put(orderDate, order.getTotalPrice());
            }
        }
        result.put("total_profit", totalProfit);
        result.put("profit_by_days", profitByDays);
        return result;
    }

    

}
