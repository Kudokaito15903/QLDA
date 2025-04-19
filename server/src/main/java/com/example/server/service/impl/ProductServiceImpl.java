package com.example.server.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import com.example.server.service.ProductService;
import com.example.server.dto.request.ProductRequest;
import com.example.server.dto.response.ProductDetailRes;
import com.example.server.dto.response.ProductResponse;
import com.example.server.entity.Product;
import com.example.server.entity.ProductInfo;
import com.example.server.entity.HeadphoneInfo;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repositories.ProductRepository;
import com.example.server.repositories.ProductInfoRepository;
import com.example.server.repositories.HeadphoneInfoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductInfoRepository productInfoRepository;
    private final HeadphoneInfoRepository headphoneInfoRepository;

    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return products.map(this::toResponse);
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return toResponse(product);
    }

    @Override
    public Page<ProductResponse> getProductsByType(String productType, Pageable pageable) {
        Page<Product> products = productRepository.findByProductTypeContaining(productType, pageable);
        return products.map(this::toResponse);
    }

    @Override
    public Page<ProductResponse> getProductsByBrand(String brand, Pageable pageable) {
        Page<Product> products = productRepository.findByBrandContaining(brand, pageable);
        return products.map(this::toResponse);
    }

    @Override
    public Page<ProductResponse> searchProducts(String name, String productType, String brand, Long sellingPrice, Pageable pageable) {
        Page<Product> products = productRepository.searchProducts(
            name,
            productType,
            brand,
            sellingPrice,
            pageable
        );
        if (products.isEmpty()) {
            Page<Product> productAllPage = productRepository.findAll(pageable);
            return productAllPage.map(this::toResponse);
        }

        return products.map(this::toResponse);
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .sellingPrice(request.getSellingPrice())
                .originalPrice(request.getOriginalPrice())
                .image(request.getImage())
                .description(request.getDescription())
                .sold(0)
                .productType(request.getProductType())
                .brand(request.getBrand())
                .build();

        Product savedProduct = productRepository.save(product);

        // Save product specific info based on type
        if ("headphone".equalsIgnoreCase(request.getProductType()) && request.getHeadphoneSpecs() != null) {
            HeadphoneInfo headphoneInfo = HeadphoneInfo.builder()
                    .product(savedProduct)
                    .headphone_type((String) request.getHeadphoneSpecs().get("headphoneType"))
                    .speaker_size((String) request.getHeadphoneSpecs().get("speakerSize"))
                    .speaker_sensitivity((String) request.getHeadphoneSpecs().get("speakerSensitivity"))
                    .speaker_impedance((String) request.getHeadphoneSpecs().get("speakerImpedance"))
                    .microphone_sensitivity((String) request.getHeadphoneSpecs().get("microphoneSensitivity"))
                    .microphone_frequency_range((String) request.getHeadphoneSpecs().get("microphoneFrequencyRange"))
                    .build();
            try {
                headphoneInfoRepository.save(headphoneInfo);
            } catch (Exception e) {
                log.error("Error saving headphone info: {}", e.getMessage());
            }
        } else if (request.getProductSpecs() != null) {
            ProductInfo productInfo = ProductInfo.builder()
                    .product(savedProduct)
                    .CPU((String) request.getProductSpecs().get("CPU"))
                    .RAM((String) request.getProductSpecs().get("RAM"))
                    .hardDrive((String) request.getProductSpecs().get("hardDrive"))
                    .GPU((String) request.getProductSpecs().get("GPU"))
                    .Display((String) request.getProductSpecs().get("Display"))
                    .battery((String) request.getProductSpecs().get("battery"))
                    .build();
            productInfoRepository.save(productInfo);
        }

        return toResponse(savedProduct);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        if (request.getName() != null) product.setName(request.getName());
        if (request.getSellingPrice() != null) product.setSellingPrice(request.getSellingPrice());
        if (request.getOriginalPrice() != null) product.setOriginalPrice(request.getOriginalPrice());
        if (request.getImage() != null) product.setImage(request.getImage());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getProductType() != null) product.setProductType(request.getProductType());
        if (request.getBrand() != null) product.setBrand(request.getBrand());
        Product updatedProduct = productRepository.save(product);
        if ("headphone".equalsIgnoreCase(request.getProductType()) && request.getHeadphoneSpecs() != null) {
            Optional<HeadphoneInfo> headphoneInfo = headphoneInfoRepository.findByProductId(id);
            if(headphoneInfo.isPresent()){
                headphoneInfo.get().setHeadphone_type((String) request.getHeadphoneSpecs().get("headphoneType"));
                headphoneInfo.get().setSpeaker_size((String) request.getHeadphoneSpecs().get("speakerSize"));
                headphoneInfo.get().setSpeaker_sensitivity((String) request.getHeadphoneSpecs().get("speakerSensitivity"));
                headphoneInfo.get().setSpeaker_impedance((String) request.getHeadphoneSpecs().get("speakerImpedance"));
                headphoneInfo.get().setMicrophone_sensitivity((String) request.getHeadphoneSpecs().get("microphoneSensitivity"));
                headphoneInfo.get().setMicrophone_frequency_range((String) request.getHeadphoneSpecs().get("microphoneFrequencyRange"));
                headphoneInfoRepository.save(headphoneInfo.get());
            }
        }
        if(request.getProductSpecs() != null){
            Optional<ProductInfo> productInfo = productInfoRepository.findByProductId(id);
            if(productInfo.isPresent()){
                productInfo.get().setCPU((String) request.getProductSpecs().get("CPU"));
                productInfo.get().setRAM((String) request.getProductSpecs().get("RAM"));
                productInfo.get().setHardDrive((String) request.getProductSpecs().get("hardDrive"));
                productInfo.get().setGPU((String) request.getProductSpecs().get("GPU"));
                productInfo.get().setDisplay((String) request.getProductSpecs().get("Display"));
                productInfo.get().setBattery((String) request.getProductSpecs().get("battery"));
                productInfoRepository.save(productInfo.get());
            }
        }
        return toResponse(updatedProduct);
    }
    @Override
    public ProductDetailRes getProductDetail(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        if (product.getProductType().equals("headphone")){
            HeadphoneInfo headphoneInfo = headphoneInfoRepository.findByProductId(id)
                    .orElseThrow(() -> new ResourceNotFoundException("HeadphoneInfo not found with id: " + id));
            Map<String, Object> headphoneSpecs = new HashMap<>();
            headphoneSpecs.put("headphoneType", headphoneInfo.getHeadphone_type());
            headphoneSpecs.put("speakerSize", headphoneInfo.getSpeaker_size());
            headphoneSpecs.put("speakerSensitivity", headphoneInfo.getSpeaker_sensitivity());
            headphoneSpecs.put("speakerImpedance", headphoneInfo.getSpeaker_impedance());
            headphoneSpecs.put("microphoneSensitivity", headphoneInfo.getMicrophone_sensitivity());
            headphoneSpecs.put("microphoneFrequencyRange", headphoneInfo.getMicrophone_frequency_range());
            return ProductDetailRes.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .sellingPrice(product.getSellingPrice())
                    .originalPrice(product.getOriginalPrice())
                    .image(product.getImage())
                    .description(product.getDescription())
                    .productType(product.getProductType())
                    .brand(product.getBrand())
                    .headphoneSpecs(headphoneSpecs)
                    .build();
        }
        else{
            ProductInfo productInfo = productInfoRepository.findByProductId(id)
                    .orElseThrow(() -> new ResourceNotFoundException("ProductInfo not found with id: " + id));
            Map<String, Object> productSpecs = new HashMap<>();
            productSpecs.put("CPU", productInfo.getCPU());
            productSpecs.put("RAM", productInfo.getRAM());
            productSpecs.put("hardDrive", productInfo.getHardDrive());
            productSpecs.put("GPU", productInfo.getGPU());
            productSpecs.put("Display", productInfo.getDisplay());
            productSpecs.put("battery", productInfo.getBattery());
            return ProductDetailRes.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .sellingPrice(product.getSellingPrice())
                    .originalPrice(product.getOriginalPrice())
                    .image(product.getImage())
                    .description(product.getDescription())
                    .productType(product.getProductType())
                    .brand(product.getBrand())
                    .productSpecs(productSpecs)
                    .build();
        }
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setDeleted(true);
        productRepository.save(product);
    }

    @Override
    public Page<ProductResponse> getTopSellingProducts(int limit, Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return products.map(this::toResponse);
    }

    @Override 
    public List<ProductResponse> sortByName(){
        List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return products.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    @Override
    public void updateProductSold(Long id, int sold){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        Integer newSold = product.getSold();
        product.setSold(newSold + sold);
        productRepository.save(product);
    }

    private ProductResponse toResponse(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setSellingPrice(product.getSellingPrice());
        response.setOriginalPrice(product.getOriginalPrice());
        response.setImage(product.getImage());
        response.setDescription(product.getDescription());
        response.setSold(product.getSold());
        response.setProductType(product.getProductType());
        response.setBrand(product.getBrand());
        response.setDeleted(product.isDeleted());
        response.setCreatedDate(product.getCreatedDate());        
        return response;
    }
    
}
