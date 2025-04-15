    package com.example.server.controller;

    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    import com.example.server.dto.request.ProductRequest;
    import com.example.server.dto.request.ProductTypeStat;
    import com.example.server.dto.request.ProductUpdateRequest;
    import com.example.server.dto.response.ProductResponse;
    import com.example.server.service.ProductService;

    import lombok.RequiredArgsConstructor;

    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestParam;

    import java.util.List;

    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.data.domain.Pageable;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;

    @RestController
    @RequestMapping("api/products")
    @RequiredArgsConstructor
    public class ProductController {
        private final ProductService productService;

        @GetMapping("/{id}")
        public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
            return ResponseEntity.ok(productService.getProductById(id));
        }
        @GetMapping
        public ResponseEntity<Page<ProductResponse>> getAllProducts(@RequestParam (defaultValue = "0") int page, @RequestParam (defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductResponse> products = productService.getAllProducts(pageable);
            return ResponseEntity.ok(products);
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
        public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam (defaultValue = "") String name, 
            @RequestParam (defaultValue = "") String productType, 
            @RequestParam (defaultValue = "") String brand, 
            @RequestParam (defaultValue = "0") Long sellingPrice, 
            @RequestParam (defaultValue = "0") int page, 
            @RequestParam (defaultValue = "10") int size){
            Pageable pageable = PageRequest.of(page, size);
            Page<ProductResponse> products = productService.searchProducts(name, productType, brand, sellingPrice, pageable);
            return ResponseEntity.ok(products);
        }
        @GetMapping("/view/product/{id}")
        public ResponseEntity<ProductResponse> viewProduct(@PathVariable Long id){
            ProductResponse product = productService.getProductById(id);
            return ResponseEntity.ok(product);
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
        
            
