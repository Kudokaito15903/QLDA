package com.example.server.service;

import java.util.List;

import com.example.server.dto.request.ProductInfoRequest;
import com.example.server.dto.request.ProductInfoUpdateRequest;
import com.example.server.dto.response.ProductInfoResponse;

public interface ProductInfoService {
    ProductInfoResponse createProductInfo(ProductInfoRequest request);
    ProductInfoResponse updateProductInfo(Long id, ProductInfoUpdateRequest request);
    void deleteProductInfo(Long id);
    List<ProductInfoResponse> getAllProductInfos();
    ProductInfoResponse getProductInfoById(Long id);
    List<ProductInfoResponse> getProductInfosByProductId(Long productId);
}
