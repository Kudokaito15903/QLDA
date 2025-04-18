package com.example.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.server.dto.request.AdminRequest;
import com.example.server.dto.response.AdminResponse;
import com.example.server.entity.Admin;
import com.example.server.service.AdminService;
import com.example.server.dto.request.ProductRequest;
import com.example.server.dto.request.ProductUpdateRequest;
import com.example.server.dto.response.ProductResponse;
import com.example.server.service.ProductService;
import com.example.server.dto.request.ProductTypeStat;
import com.example.server.service.OrderService;

import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;
    private final OrderService orderService;

    @Operation(summary = "Admin login", description = "Login using username and password")
    @PostMapping("/login")
    public ResponseEntity<AdminResponse> login(@RequestBody AdminRequest adminRequest) {
        Admin admin = adminService.login(adminRequest.getUsername(), adminRequest.getPassword());
        if (admin != null) {
            log.info("Admin logged in successfully");
            return ResponseEntity.ok(new AdminResponse(admin.getUsername()));
        } else {
            log.warn("Admin login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Operation(summary = "Admin logout", description = "Logout the current session")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Update product", description = "Update product information by ID")
    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id, @RequestBody ProductUpdateRequest request) {
        ProductResponse product = productService.updateProduct(id, request);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Delete product", description = "Delete product by ID")
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Create product", description = "Create a new product")
    @PostMapping("/createProduct")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest request) {
        ProductResponse product = productService.createProduct(request);
        return ResponseEntity.ok(product);
    }

    @Operation(summary = "Get top trending products", description = "Get list of top selling products")
    @GetMapping("/trending_products")
    public ResponseEntity<Page<ProductResponse>> getTopSellingProducts(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductResponse> products = productService.getTopSellingProducts(limit, pageable);
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "Get top selling category", description = "Get the product category with highest sales")
    @GetMapping("/top_category")
    public ResponseEntity<List<ProductTypeStat>> getTopCategoryProducts() {
        List<ProductTypeStat> products = productService.getTopCategoryProducts();
        return ResponseEntity.ok(products);
    }

    @Operation(summary = "Get total orders", description = "Get total number of orders placed")
    @GetMapping("/total_order")
    public ResponseEntity<Map<String, Object>> getTotalOrder() {
        return ResponseEntity.ok(orderService.getTotalOrder());
    }

    @Operation(summary = "Get total profit", description = "Get total profit from all orders")
    @GetMapping("/total_profit")
    public ResponseEntity<Map<String, Object>> getTotalProfit() {
        return ResponseEntity.ok(orderService.getTotalProfit());
    }
}
