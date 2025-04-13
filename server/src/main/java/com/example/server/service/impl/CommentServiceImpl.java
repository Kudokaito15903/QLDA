package com.example.server.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.server.dto.request.CommentRequest;
import com.example.server.dto.response.CommentResponse;
import com.example.server.entity.Comment;
import com.example.server.entity.Product;
import com.example.server.entity.User;
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
   private final ProductRepository productRepository;
   private final UserRepository userRepository;
   private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
   
   @Override
   public Page<Comment> getPageComments(Pageable pageable) {
       log.info("Fetching page {} of comments with size {}", pageable.getPageNumber(), pageable.getPageSize());
       return commentRepository.findAll(pageable);
   }
   
   @Override
   public List<CommentResponse> getAllComments() {
       log.info("Fetching all comments");
       return commentRepository.findAll()
               .stream()
               .map(this::mapToResponse)
               .collect(Collectors.toList());
   }
   
   @Override
   public CommentResponse createComment(CommentRequest request) {
       log.info("Creating new comment for product ID: {}", request.getProductId());
       
       Product product = productRepository.findById(request.getProductId())
               .orElseThrow(() -> new RuntimeException("Product not found with ID: " + request.getProductId()));
       
       User user = userRepository.findById(1L)
               .orElseThrow(() -> new RuntimeException("User not found"));
       
       Comment comment = Comment.builder()
               .username(request.getUsername())
               .comment(request.getComment())
               .rating(request.getRating())
               .product(product)
               .user(user)
               .build();
       
       Comment savedComment = commentRepository.save(comment);
       log.info("Comment created with ID: {}", savedComment.getId());
       
       return mapToResponse(savedComment);
   }
   
   @Override
   public CommentResponse updateComment(String id, CommentRequest request) {
       log.info("Updating comment with ID: {}", id);
       
       Long commentId = Long.parseLong(id);
       Comment existingComment = commentRepository.findById(commentId)
               .orElseThrow(() -> {
                   log.error("Comment not found with ID: {}", id);
                   return new RuntimeException("Comment not found with ID: " + id);
               });
       
       Product product = productRepository.findById(request.getProductId())
               .orElseThrow(() -> new RuntimeException("Product not found with ID: " + request.getProductId()));
       
       existingComment.setUsername(request.getUsername());
       existingComment.setComment(request.getComment());
       existingComment.setRating(request.getRating());
       existingComment.setProduct(product);
       // createdAt is not updated, keeping the original comment date
       
       Comment updatedComment = commentRepository.save(existingComment);
       log.info("Comment updated successfully with ID: {}", id);
       
       return mapToResponse(updatedComment);
   }
   
   @Override
   public void delete(String id) {
       log.info("Deleting comment with ID: {}", id);
       
       Long commentId = Long.parseLong(id);
       if (!commentRepository.existsById(commentId)) {
           log.error("Comment not found with ID: {}", id);
           throw new RuntimeException("Comment not found with ID: " + id);
       }
       
       commentRepository.deleteById(commentId);
       log.info("Comment deleted successfully with ID: {}", id);
   }
   
   @Override
   public List<CommentResponse> getCommentsByProductId(Integer productId) {
       log.info("Fetching comments for product ID: {}", productId);
       
       return commentRepository.findByProductId(productId)
               .stream()
               .map(this::mapToResponse)
               .collect(Collectors.toList());
   }
   
   @Override
   public CommentResponse getCommentById(String id) {
       log.info("Fetching comment with ID: {}", id);
       
       Long commentId = Long.parseLong(id);
       Comment comment = commentRepository.findById(commentId)
               .orElseThrow(() -> {
                   log.error("Comment not found with ID: {}", id);
                   return new RuntimeException("Comment not found with ID: " + id);
               });
       
       return mapToResponse(comment);
   }
   
   @Override
   public boolean existsById(String id) {
       Long commentId = Long.parseLong(id);
       boolean exists = commentRepository.existsById(commentId);
       log.info("Checking if comment exists with ID: {} - Result: {}", id, exists);
       return exists;
   }
   
   private CommentResponse mapToResponse(Comment comment) {
       return CommentResponse.builder()
               .id(comment.getId())
               .username(comment.getUsername())
               .productId(comment.getProduct().getId().intValue())
               .comment(comment.getComment())
               .date(comment.getCreatedAt().format(dateFormatter))
               .rating(comment.getRating())
               .build();
   }
}