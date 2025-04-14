package com.example.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;
    
    @GetMapping("/")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        try {
            List<OrderResponse> orders = orderService.getAllOrders();
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error getting all orders: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
    @PostMapping("/create")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        try {
            OrderResponse createdOrder = orderService.createOrder(request);
            return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating order: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    // @GetMapping("/search")
    // public ResponseEntity<Page<OrderResponse>> searchOrders(
    //     @RequestParam(required = false) String username,
    //     @RequestParam(required = false) String status,
    //     @RequestParam(required = false) Long orderId,
    //     @RequestParam(required = false) Integer totalPrice, 
    //     @RequestParam(required = false) Integer page,
    //     @RequestParam(required = false) Integer size
    // ){
    //     Pageable pageable = PageRequest.of(page - 1, size);
    //     return ResponseEntity.ok(orderService.searchOrders(username, status, orderId, totalPrice, pageable));
    // }
    @GetMapping("pagination/totalprice/{totalprice}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByTotalPrice(
        @PathVariable Integer totalprice,
        Pageable pageable
        ){
            try{
                return ResponseEntity.ok(orderService.findByTotalPricePageable(totalprice, pageable));
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
        return ResponseEntity.ok(orderService.findByFullnamePageable(fullname, pageable));
    }
    @GetMapping("pagination/status/{status}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByStatus(
        @PathVariable String status,
        Pageable pageable
    ){
        return ResponseEntity.ok(orderService.findByStatusPageable(status, pageable));
    }
    @GetMapping("pagination/orderid/{orderid}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByOrderid(
        @PathVariable Long orderid,
        Pageable pageable
    ){
        return ResponseEntity.ok(orderService.findByOrderIDPageable(orderid, pageable));
    }
    @GetMapping("admin/total_order")
    public ResponseEntity<Map<String, Object>> getTotalOrder(){
        return ResponseEntity.ok(orderService.getTotalOrder());
    }
    @GetMapping("admin/total_profit")
    public ResponseEntity<Map<String, Object>> getTotalProfit(){
        return ResponseEntity.ok(orderService.getTotalProfit());
    }

}
