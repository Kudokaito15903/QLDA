package com.example.server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.server.service.ProductInfoService;
import java.util.List;
import com.example.server.dto.request.ProductInfoRequest;
import com.example.server.dto.request.ProductInfoUpdateRequest;
import com.example.server.dto.response.ProductInfoResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/product-info")
@RequiredArgsConstructor
public class ProductInfoController {
    private final ProductInfoService productInfoService;

    @GetMapping("/{id}")
    public ResponseEntity<ProductInfoResponse> getProductInfoById(@PathVariable Long id) {
        return ResponseEntity.ok(productInfoService.getProductInfoById(id));
    }
    @GetMapping
    public ResponseEntity<List<ProductInfoResponse>> getAllProductInfo() {
        return ResponseEntity.ok(productInfoService.getAllProductInfos());
    }
    @PostMapping("/create")
    public ResponseEntity<ProductInfoResponse> createProductInfo(@RequestBody ProductInfoRequest request) {
        return ResponseEntity.ok(productInfoService.createProductInfo(request));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ProductInfoResponse> updateProductInfo(@PathVariable Long id, @RequestBody ProductInfoUpdateRequest request) {
        return ResponseEntity.ok(productInfoService.updateProductInfo(id, request));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProductInfo(@PathVariable Long id) {
        productInfoService.deleteProductInfo(id);   
        return ResponseEntity.noContent().build();
    }
}
