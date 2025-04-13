package com.example.server.repositories;

import org.springframework.stereotype.Repository;

import com.example.server.entity.Wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist,Long>{
    
}
