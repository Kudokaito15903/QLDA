package com.example.server.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.server.service.WishlistService;
import com.example.server.dto.response.WishlistResponse;
import com.example.server.dto.request.WishlistRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping("/{id}")
    public ResponseEntity<WishlistResponse> getWishlistById(@PathVariable Long id) {
        return ResponseEntity.ok(wishlistService.findById(id));
    }
    @GetMapping
    public ResponseEntity<List<WishlistResponse>> getAllWishlists() {
        return ResponseEntity.ok(wishlistService.findAll());
    }
    @PostMapping("/create")
    public ResponseEntity<WishlistResponse> createWishlist(@RequestBody WishlistRequest request) {
        return ResponseEntity.ok(wishlistService.createWishlist(request));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteWishlist(@PathVariable Long id) {
        wishlistService.deleteWishlist(id);
        return ResponseEntity.noContent().build();
    }
}
