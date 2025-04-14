package com.example.server.service;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.server.dto.request.CommentRequest;
import com.example.server.dto.request.CommentUpdateRequest;
import com.example.server.dto.response.CommentResponse;
import com.example.server.entity.Comment;

@Service
public interface CommentService {
    
    // Lấy tất cả comments
    List<CommentResponse> getAllComments();
    
    // Phương thức phân trang comments
    Page<CommentResponse> getPageComments(Pageable pageable);
        
    // Tạo comment mới
    CommentResponse createComment(CommentRequest request);
    
    // Cập nhật comment theo id
    CommentResponse updateComment(Long id, CommentUpdateRequest request);
    
    // Xóa comment theo id
    void delete(Long id);
    
    // Lấy comments theo productId
    List<CommentResponse> getCommentsByProductId(Long productId);
    
    // Lấy comment theo id
    CommentResponse getCommentById(Long id);    
    // Phân trang comments theo userId
    Page<CommentResponse> getCommentsByUser(Long userId, Pageable pageable);

    
}