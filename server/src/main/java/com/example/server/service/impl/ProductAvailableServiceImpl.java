package com.example.server.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.server.dto.request.ProductAvailableRequest;
import com.example.server.dto.response.ProductAvailableResponse;
import com.example.server.entity.Product;
import com.example.server.entity.ProductAvailable;
import com.example.server.repositories.ProductAvailableRepository;
import com.example.server.repositories.ProductRepository;
import com.example.server.service.ProductAvailableService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
@RequiredArgsConstructor
public class ProductAvailableServiceImpl implements ProductAvailableService {
    private final ProductAvailableRepository productAvailableRepository;
    private final ProductRepository productRepository;
    @Override
    public List<ProductAvailableResponse> findAll() {
        List<ProductAvailable> productAvailables = productAvailableRepository.findAll();
        return productAvailables.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    @Override
    public ProductAvailableResponse findById(Long id) {
        ProductAvailable productAvailable = productAvailableRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product available not found"));
        return convertToResponse(productAvailable);
    }
    @Override
    public void createProductAvailable(ProductAvailableRequest request) {
        Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));
        ProductAvailable productAvailable = ProductAvailable.builder()
            .product(product)
            .color(request.getColor())
            .available(request.getAvailable())
            .build();
        productAvailableRepository.save(productAvailable);
    }
    @Override
    public void UpdateProductQuantity(ProductAvailableRequest request) {
        Long productID = request.getProductId();
        String color = request.getColor();
        Integer quantity = request.getAvailable();
        List<ProductAvailable> productAvailables = productAvailableRepository.findAll();
        productAvailables.stream()
            .filter(productAvailable -> productAvailable.getProduct().getId().equals(productID) && productAvailable.getColor().equals(color))
            .findFirst()
            .ifPresent(productAvailable -> {
                productAvailable.setAvailable(productAvailable.getAvailable()-quantity);
                productAvailableRepository.save(productAvailable);
            });
    }
    @Override
    public void updateProductAvailable(ProductAvailableRequest request) {
        ProductAvailable productAvailable = productAvailableRepository.findById(request.getId())
            .orElseThrow(() -> new RuntimeException("Product available not found"));
        productAvailable.setAvailable(request.getAvailable());
        productAvailable.setColor(request.getColor());
        productAvailableRepository.save(productAvailable);
    }

    @Override
    public void deleteProductAvailable(Long id) {
        productAvailableRepository.deleteById(id);
    }

    private ProductAvailableResponse convertToResponse(ProductAvailable productAvailable) {
        return ProductAvailableResponse.builder()
            .id(productAvailable.getId())
            .productId(productAvailable.getProduct().getId())
            .available(productAvailable.getAvailable())
            .color(productAvailable.getColor())
            .productName(productAvailable.getProduct().getName())
            .lastUpdated(productAvailable.getUpdatedAt())
            .build();
    }
}