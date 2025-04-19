package com.example.server.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.server.service.ProductAvailableService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import java.util.List;

import com.example.server.dto.request.ProductAvailableRequest;
import com.example.server.dto.response.ProductAvailableResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
@RestController
@RequiredArgsConstructor
@Slf4j
public class ProductAvailableController {
    private final ProductAvailableService productAvailableService;
    @GetMapping("/productAvailable")
    public ResponseEntity<Page<ProductAvailableResponse>> getAllProductAvailable(){
        try {
            Pageable pageable = PageRequest.of(0, 10);
            Page<ProductAvailableResponse> productAvailable = productAvailableService.findAll(pageable);
            return ResponseEntity.ok(productAvailable);
        } catch (Exception e) {
            log.error("Error getting all product available: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/updateQuantity")
    public ResponseEntity<ProductAvailableResponse> updateProductQuantity(@RequestBody ProductAvailableRequest request){
        try {
            productAvailableService.UpdateProductQuantity(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Error updating quantity: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/productAvailable/save")
    public ResponseEntity<ProductAvailableResponse> createProductAvailable(@RequestBody ProductAvailableRequest request){
        try {
            ProductAvailableResponse productAvailable = productAvailableService.createProductAvailable(request);
            return ResponseEntity.ok(productAvailable);
        } catch (Exception e) {
            log.error("Error creating product available: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/productAvailable/{productID}")
    public ResponseEntity<Page<ProductAvailableResponse>> getProductAvailableByProductID(@PathVariable Long productID, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductAvailableResponse> productAvailable = productAvailableService.findByProductID(productID, pageable);
            return ResponseEntity.ok(productAvailable);
        } catch (Exception e) {
            log.error("Error getting product available: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/productAvailable/update")
    public ResponseEntity<ProductAvailableResponse> updateProductAvailable(@RequestBody ProductAvailableRequest request){
        try {
            ProductAvailableResponse productAvailable = productAvailableService.updateProductAvailable(request);
            return ResponseEntity.ok(productAvailable);
        } catch (Exception e) {
            log.error("Error updating product available: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}    

