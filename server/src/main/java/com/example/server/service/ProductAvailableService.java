package com.example.server.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.server.dto.request.ProductAvailableRequest;
import com.example.server.dto.response.ProductAvailableResponse;

public interface ProductAvailableService {
    Page<ProductAvailableResponse> findAll(Pageable pageable);
    ProductAvailableResponse findById(Long id);
    void UpdateProductQuantity (ProductAvailableRequest request);
    void deleteProductAvailable(Long id);
    ProductAvailableResponse createProductAvailable(ProductAvailableRequest request);
    ProductAvailableResponse updateProductAvailable(ProductAvailableRequest request);
    Page<ProductAvailableResponse> findByProductID(Long productID, Pageable pageable);
}
