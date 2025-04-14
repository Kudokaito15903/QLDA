package com.example.server.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
public class CommentResponse {
    private Long id;
    private String username;
    private Integer productId;
    private String comment;
    private LocalDateTime createdAt;
    private Integer rating;
} 