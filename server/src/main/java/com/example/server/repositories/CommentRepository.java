package com.example.server.repositories;

import com.example.server.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProductId(Long productId);
    Page<Comment> findAll(Pageable pageable);
    Page<Comment> findByProductId(Long productId, Pageable pageable);
    Page<Comment> findByUserId(Long userId, Pageable pageable);
    Page<Comment> findByRating(Integer rating, Pageable pageable);
    boolean existsById(Long id);
} 