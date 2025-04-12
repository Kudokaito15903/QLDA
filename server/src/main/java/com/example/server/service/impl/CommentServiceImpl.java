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
import com.example.server.repositories.CommentRepository;
import com.example.server.service.CommentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

   private final CommentRepository commentRepository;
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
       
       Comment comment = Comment.builder()
               .username(request.getUsername())
               .productId(request.getProductId())
               .comment(request.getComment())
               .date(LocalDateTime.now().format(dateFormatter))
               .rating(request.getRating())
               .build();
       
       Comment savedComment = commentRepository.save(comment);
       log.info("Comment created with ID: {}", savedComment.getId());
       
       return mapToResponse(savedComment);
   }
   
   @Override
   public CommentResponse updateComment(String id, CommentRequest request) {
       log.info("Updating comment with ID: {}", id);
       
       Comment existingComment = commentRepository.findById(id)
               .orElseThrow(() -> {
                   log.error("Comment not found with ID: {}", id);
                   return new RuntimeException("Comment not found with ID: " + id);
               });
       
       existingComment.setUsername(request.getUsername());
       existingComment.setProductId(request.getProductId());
       existingComment.setComment(request.getComment());
       existingComment.setRating(request.getRating());
       // Date is not updated, keeping the original comment date
       
       Comment updatedComment = commentRepository.save(existingComment);
       log.info("Comment updated successfully with ID: {}", id);
       
       return mapToResponse(updatedComment);
   }
   
   @Override
   public void delete(String id) {
       log.info("Deleting comment with ID: {}", id);
       
       if (!commentRepository.existsById(id)) {
           log.error("Comment not found with ID: {}", id);
           throw new RuntimeException("Comment not found with ID: " + id);
       }
       
       commentRepository.deleteById(id);
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
       
       Comment comment = commentRepository.findById(id)
               .orElseThrow(() -> {
                   log.error("Comment not found with ID: {}", id);
                   return new RuntimeException("Comment not found with ID: " + id);
               });
       
       return mapToResponse(comment);
   }
   
   @Override
   public boolean existsById(String id) {
       boolean exists = commentRepository.existsById(id);
       log.info("Checking if comment exists with ID: {} - Result: {}", id, exists);
       return exists;
   }
   
   private CommentResponse mapToResponse(Comment comment) {
       return CommentResponse.builder()
               .id(comment.getId())
               .username(comment.getUsername())
               .productId(comment.getProductId())
               .comment(comment.getComment())
               .date(comment.getDate())
               .rating(comment.getRating())
               .build();
   }
}