package com.example.server.service.impl;

import com.example.server.dto.request.WishlistRequest;
import com.example.server.dto.response.WishlistResponse;
import com.example.server.entity.Product;
import com.example.server.entity.User;
import com.example.server.entity.Wishlist;
import com.example.server.service.WishlistService;
import com.example.server.repositories.WishlistRepository;
import com.example.server.repositories.ProductRepository;
import com.example.server.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
@Slf4j
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public WishlistResponse createWishlist(WishlistRequest request){
        try{
            User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
            Product product = productRepository.findById(request.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));
            Wishlist wishlist = new Wishlist();
            wishlist.setUser(user);
            wishlist.setProduct(product);
            wishlistRepository.save(wishlist);
            log.info("Added to wishlist successfully");
            return toWishlistResponse(wishlist);
    }catch(Exception e){
        log.error("Error adding to wishlist: {}", e.getMessage());
        throw new RuntimeException("Error adding to wishlist");
    }
    }

    @Override
    public void deleteWishlist(Long id){
       try{
        wishlistRepository.deleteById(id);
        log.info("Removed from wishlist successfully");
       }catch(Exception e){
        log.error("Error removing from wishlist: {}", e.getMessage());
        throw new RuntimeException("Error removing from wishlist");
       }
    }
    public List<WishlistResponse>findAll(){
        List<Wishlist> wishlist = wishlistRepository.findAll();
        return wishlist.stream()
        .map(this::toWishlistResponse)
        .collect(Collectors.toList());
    }
    public WishlistResponse findById(Long id){
        Wishlist wishlist = wishlistRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Wishlist not found"));
        return toWishlistResponse(wishlist);
    }
    
    private WishlistResponse toWishlistResponse(Wishlist wishlist){
        return WishlistResponse.builder()
                .id(wishlist.getId())
                .userName(wishlist.getUser().getUsername())
                .productName(wishlist.getProduct().getName())
                .productPrice(wishlist.getProduct().getSellingPrice())
                .productImage(wishlist.getProduct().getImage())
                .build();
    }
        
 
}