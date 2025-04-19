package com.example.server.service.impl;

import org.springframework.stereotype.Service;

import com.example.server.dto.request.ProductInfoRequest;
import com.example.server.dto.request.ProductInfoUpdateRequest;
import com.example.server.dto.response.ProductInfoResponse;
import com.example.server.entity.Product;
import com.example.server.entity.ProductInfo;
import com.example.server.repositories.ProductInfoRepository;
import com.example.server.repositories.ProductRepository;
import com.example.server.service.ProductInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductInfoServiceImpl implements ProductInfoService {

    private final ProductInfoRepository productInfoRepository;
    private final ProductRepository productRepository;
    
    @Override
    public ProductInfoResponse createProductInfo(ProductInfoRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        ProductInfo productInfo = ProductInfo.builder()
                .product(product)
                .CPU(request.getCPU())
                .RAM(request.getRAM())
                .hardDrive(request.getHardDrive())
                .GPU(request.getGPU())
                .Display(request.getDisplay())
                .battery(request.getBattery())
                .build();
        productInfoRepository.save(productInfo);
        return toProductInfoResponse(productInfo);
    }

    @Override
    public ProductInfoResponse updateProductInfo(Long id, ProductInfoUpdateRequest request) {
        ProductInfo productInfo = productInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ProductInfo not found"));
        
        productInfo.setCPU(request.getCPU());
        productInfo.setRAM(request.getRAM());
        productInfo.setHardDrive(request.getHardDrive());
        productInfo.setGPU(request.getGPU());
        productInfo.setDisplay(request.getDisplay());
        productInfo.setBattery(request.getBattery());
        productInfoRepository.save(productInfo);
        log.info("ProductInfo updated successfully");   
        return toProductInfoResponse(productInfo);
    }

    @Override
    public void deleteProductInfo(Long id) {
        if (!productInfoRepository.existsById(id)) {
            throw new RuntimeException("ProductInfo not found");
        }
        productInfoRepository.deleteById(id);
        log.info("ProductInfo deleted successfully");
    }

    @Override
    public List<ProductInfoResponse> getAllProductInfos() {
        return productInfoRepository.findAll().stream()
                .map(this::toProductInfoResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductInfoResponse getProductInfoById(Long id) {
        return productInfoRepository.findById(id)
                .map(this::toProductInfoResponse)
                .orElseThrow(() -> new RuntimeException("ProductInfo not found"));
    }

    @Override
    public List<ProductInfoResponse> getProductInfosByProductId(Long productId) {
        return productInfoRepository.findByProductId(productId)
                .stream()
                .map(this::toProductInfoResponse)
                .collect(Collectors.toList());
    }
    

    private ProductInfoResponse toProductInfoResponse(ProductInfo productInfo) {
        return ProductInfoResponse.builder()
                .id(productInfo.getId())
                .productId(productInfo.getProduct().getId())
                .productName(productInfo.getProduct().getName())
                .CPU(productInfo.getCPU())
                .RAM(productInfo.getRAM())
                .hardDrive(productInfo.getHardDrive())
                .GPU(productInfo.getGPU())
                .Display(productInfo.getDisplay())
                .battery(productInfo.getBattery())
                .build();
    }
}