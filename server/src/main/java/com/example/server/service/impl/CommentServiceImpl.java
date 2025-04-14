package com.example.server.service.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.server.dto.request.CommentRequest;
import com.example.server.dto.request.CommentUpdateRequest;
import com.example.server.dto.response.CommentResponse;
import com.example.server.entity.Comment;
import com.example.server.entity.Product;
import com.example.server.entity.User;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repositories.CommentRepository;
import com.example.server.repositories.ProductRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.service.CommentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public List<CommentResponse> getAllComments() {
        return commentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Override
    public Page<CommentResponse> getPageComments(Pageable pageable) {
        return commentRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Override
    public List<CommentResponse> getCommentsByProductId(Long productId) {
        return commentRepository.findByProductId(productId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CommentResponse getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        return mapToResponse(comment);
    }

    @Override
    public CommentResponse createComment(CommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));
        
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + request.getProductId()));

        Comment comment = Comment.builder()
                .comment(request.getComment())
                .rating(request.getRating())
                .user(user)
                .product(product)
                .build();

        return mapToResponse(commentRepository.save(comment));
    }

    @Override
    public CommentResponse updateComment(Long id, CommentUpdateRequest request) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
                if (request.getComment() != null) {
                    comment.setComment(request.getComment());
                }
                
                if (request.getRating() != null) {
                    comment.setRating(request.getRating());
                }
        return mapToResponse(commentRepository.save(comment));
    }

    @Override
    public void delete(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        
        commentRepository.deleteById(id);
    }    
    @Override
    public Page<CommentResponse> getCommentsByUser(Long userId, Pageable pageable) {
        return commentRepository.findByUserId(userId, pageable)
                .map(this::mapToResponse);
    }
    private CommentResponse mapToResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .username(comment.getUser().getUsername())
                .productId(comment.getProduct().getId().intValue())
                .comment(comment.getComment())
                .createdAt(comment.getCreatedAt())
                .rating(comment.getRating())
                .build();
    }
}