package com.example.server.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentRequest {
    // Không cần ID trong request vì ID sẽ được sinh ra tự động hoặc đã có trong path parameter
    
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotNull(message = "Product ID is required")
    private Long productId;
    
    @NotBlank(message = "Comment content is required")
    private String comment;
    
    // Date sẽ được tạo tự động ở phía server
    
    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Integer rating;
} 