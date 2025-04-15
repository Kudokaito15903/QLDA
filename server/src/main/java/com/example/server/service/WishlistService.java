package com.example.server.service;

import java.util.List; 

import com.example.server.dto.request.WishlistRequest;
import com.example.server.dto.response.WishlistResponse;

public interface WishlistService {
    WishlistResponse addToWishlist(WishlistRequest request);
    void removeFromWishlist(Long id);
    List<WishlistResponse>findAll();
    WishlistResponse findById(Long id);

}
