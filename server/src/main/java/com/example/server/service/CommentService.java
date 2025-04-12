package com.example.server.service;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.server.dto.request.CommentRequest;
import com.example.server.dto.response.CommentResponse;
import com.example.server.entity.Comment;

@Service
public interface CommentService {
    
    // Phương thức phân trang comments
    Page<Comment> getPageComments(Pageable pageable);
    
    // Lấy tất cả comments
    List<CommentResponse> getAllComments();
    
    // Tạo comment mới
    CommentResponse createComment(CommentRequest request);
    
    // Cập nhật comment theo id
    CommentResponse updateComment(String id, CommentRequest request);
    
    // Xóa comment theo id
    void delete(String id);
    
    // Lấy comments theo productId
    List<CommentResponse> getCommentsByProductId(Integer productId);
    
    // Lấy comment theo id
    CommentResponse getCommentById(String id);
    
    // Kiểm tra comment có tồn tại không
    boolean existsById(String id);
}