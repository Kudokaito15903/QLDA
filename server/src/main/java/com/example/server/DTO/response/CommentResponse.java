package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CommentResponse {
    private String id;
    private String username;
    private Integer productId;
    private String comment;
    private String date;
    private Integer rating;
} 