package com.example.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import com.example.server.dto.request.OrderRequest;
import com.example.server.dto.response.OrderResponse;
import com.example.server.service.OrderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;
    
    @GetMapping("/")
    public ResponseEntity<Page<OrderResponse>> getAllOrders(Pageable pageable) {
        try {
            return ResponseEntity.ok(orderService.getAllOrders(pageable));
        } catch (Exception e) {
            log.error("Error getting all orders: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        try {
            log.info("Creating order with request: {}", request);
            return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(request));
        } catch (Exception e) {
            log.error("Error creating order: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<Page<OrderResponse>> searchOrders(
        @RequestParam(required = false, defaultValue = "") String username,
        @RequestParam(required = false, defaultValue = "") String status,
        @RequestParam(required = false, defaultValue = "0") Long orderId,
        @RequestParam(required = false, defaultValue = "0") Integer totalPrice, 
        @RequestParam(required = false, defaultValue = "0") Integer page,
        @RequestParam(required = false, defaultValue = "10") Integer size
    ){
        Pageable pageable = PageRequest.of(page - 1, size);
        return ResponseEntity.ok(orderService.searchOrders(username, status, orderId, totalPrice, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrder(@PathVariable Long id, @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.updateOrder(id, request));
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("pagination/totalPrice/{totalPrice}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByTotalPrice(
        @PathVariable Integer totalPrice,
        Pageable pageable
        ){
            try{
                return ResponseEntity.ok(orderService.findByTotalPricePageable(totalPrice, pageable));
            }catch(Exception e){
                log.error("Error getting orders by total price: {}", e.getMessage());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @GetMapping("pagination/fullname/{fullname}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByFullname(
        @PathVariable String fullname,
        Pageable pageable
    ){
        try{
            return ResponseEntity.ok(orderService.findByFullnamePageable(fullname, pageable));
        }catch(Exception e){
            log.error("Error getting orders by fullname: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("pagination/status/{status}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByStatus(
        @PathVariable String status,
        Pageable pageable
    ){
        try{
            return ResponseEntity.ok(orderService.findByStatusPageable(status, pageable));
        }catch(Exception e){
            log.error("Error getting orders by status: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("pagination/orderid/{orderid}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByOrderid(
        @PathVariable Long orderid,
        Pageable pageable
    ){
        try{
            return ResponseEntity.ok(orderService.findByOrderIDPageable(orderid, pageable));
        }catch(Exception e){
            log.error("Error getting orders by orderid: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("pagination/username/{username}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByUsername(
        @PathVariable String username,
        Pageable pageable
    ){
        try{
            return ResponseEntity.ok(orderService.findByUsernameContaining(username, pageable));
        }catch(Exception e){
            log.error("Error getting orders by username: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
