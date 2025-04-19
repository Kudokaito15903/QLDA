package com.example.server.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.server.dto.request.OrderDetailRequest;
import com.example.server.dto.response.OrderDetailResponse;
import com.example.server.service.OrderDetailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class OrderDetailController {
    private final OrderDetailService orderDetailService;

    @GetMapping("/order-details/{id}")
    public OrderDetailResponse getDetailById(@PathVariable Long id){
        return orderDetailService.getDetailById(id);
    }
    
    @GetMapping("/order-details/product/{productId}")
    public List<OrderDetailResponse> getOrderDetailsByProduct(@PathVariable Long productId){
        return orderDetailService.getOrderDetailsByProduct(productId);
    }
    @GetMapping("/order-details")
    public List<OrderDetailResponse> getAllOrderDetails(){
        return orderDetailService.getAllOrderDetails();
    }
    @PostMapping("/order-details")
    public void createOrderDetail(@RequestBody OrderDetailRequest request){
        try{
            orderDetailService.createOrderDetail(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating order detail");
        }
    }
    @PutMapping("/order-details/{id}")
    public void updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetailRequest request){
        orderDetailService.updateOrderDetail(id, request);
    }
    @DeleteMapping("/order-details/{id}")
    public void deleteOrderDetail(@PathVariable Long id){
        orderDetailService.deleteOrderDetail(id);
    }
}
