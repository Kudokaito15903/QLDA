package com.example.server.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.server.dto.request.ProductRequest;
import com.example.server.dto.request.ProductTypeStat;
import com.example.server.dto.request.ProductUpdateRequest;
import com.example.server.dto.response.ProductResponse;

public interface ProductService {
    Page<ProductResponse> getAllProducts(Pageable pageable);
    ProductResponse getProductById(Long id);
    Page<ProductResponse> getProductsByType(String productType, Pageable pageable);
    Page<ProductResponse> getProductsByBrand(String brand, Pageable pageable);
    Page<ProductResponse> searchProducts(String name, String productType, String brand, Long sellingPrice, Pageable pageable);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProduct(Long id, ProductUpdateRequest request);
    void deleteProduct(Long id);
    Page<ProductResponse> getTopSellingProducts(int limit, Pageable pageable);
    ProductResponse updateProductStock(Long id, int quantityChange);
    List<ProductResponse> sortByName();
    void updateProductSold(Long id);
    List<ProductTypeStat> getTopCategoryProducts();

}


