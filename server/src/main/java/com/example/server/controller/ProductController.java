    package com.example.server.controller;

    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;
    import com.example.server.dto.response.ProductResponse;
    import com.example.server.service.ProductService;

    import lombok.RequiredArgsConstructor;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.data.domain.Pageable;
    import org.springframework.web.bind.annotation.PutMapping;

    @RestController
    @RequestMapping("api/products")
    @RequiredArgsConstructor
    public class ProductController {
        private final ProductService productService;

        @GetMapping("/{id}")
        public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
            return ResponseEntity.ok(productService.getProductById(id));
        }
        @GetMapping("/")
        public ResponseEntity<Map<String,Object>> getAllProducts(@RequestParam (defaultValue = "0") int page, @RequestParam (defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductResponse> products = productService.getAllProducts(pageable);
            Map<String,Object> response = new HashMap<>();
            response.put("products",products.getContent());
            response.put("totalPages",products.getTotalPages());
            response.put("totalElements",products.getTotalElements());
            return ResponseEntity.ok(response);
        }

        @GetMapping("/{productType}")
        public ResponseEntity<Page<ProductResponse>> getProductsByType(@PathVariable String productType, @RequestParam (defaultValue = "0") int page, @RequestParam (defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductResponse> products = productService.getProductsByType(productType, pageable);
            return ResponseEntity.ok(products);
        }
        @GetMapping("/{brand}")
        public ResponseEntity<Page<ProductResponse>> getProductsByBrand(@PathVariable String brand, @RequestParam (defaultValue = "0") int page, @RequestParam (defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductResponse> products = productService.getProductsByBrand(brand, pageable);
            return ResponseEntity.ok(products);
        }
        @GetMapping("/search")
        public ResponseEntity<Map<String,Object>> searchProducts(
            @RequestParam (defaultValue = "") String name, 
            @RequestParam (defaultValue = "") String productType, 
            @RequestParam (defaultValue = "") String brand, 
            @RequestParam (defaultValue = "0") Long sellingPrice, 
            @RequestParam (defaultValue = "0") int page, 
            @RequestParam (defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductResponse> products = productService.searchProducts(name, productType, brand, sellingPrice, pageable);
            Map<String,Object> response = new HashMap<>();
            response.put("products",products.getContent());
            response.put("totalPages",products.getTotalPages());
            response.put("totalElements",products.getTotalElements());
            return ResponseEntity.ok(response);
        }
        @GetMapping("/view/productID/{productID}")
        public ResponseEntity<ProductResponse> viewProductID(@PathVariable Long productID){
            ProductResponse product = productService.getProductById(productID);
            return ResponseEntity.ok(product);
        }
        @PutMapping("/updateSold/{id}")
        public ResponseEntity<Void> updateProductSold(@PathVariable Long id){
            productService.updateProductSold(id);
            return ResponseEntity.ok().build();
        }
        
    }        
        
            
