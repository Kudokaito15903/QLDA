package com.example.server.service;

import java.util.List;

import com.example.server.dto.request.ProductAvailableRequest;
import com.example.server.dto.response.ProductAvailableResponse;

public interface ProductAvailableService {
    List<ProductAvailableResponse> findAll();
    ProductAvailableResponse findById(Long id);
    void UpdateProductQuantity (ProductAvailableRequest request);
    void deleteProductAvailable(Long id);
    void createProductAvailable(ProductAvailableRequest request);
    void updateProductAvailable(ProductAvailableRequest request);
}
