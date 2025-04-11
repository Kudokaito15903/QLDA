package com.example.server.service;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.server.DTO.CommentDTO;
import com.example.server.entity.Comment;
import com.example.server.mapper.CommentMapper;
import com.example.server.repositories.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commnentMapper;

    public List<CommentDTO> findAll() {
        List<Comment> comments = commentRepository.findAll();
        return commnentMapper.toDtos(comments);
    }
    public Page<Comment> getPageComments(Pageable pageable){
        return commentRepository.findAll(pageable);
    }
    public void save(CommentDTO commentDTO) {
        Comment comment = commnentMapper.toEntity(commentDTO);
        commentRepository.save(comment);
    }
    public void delete(String id) {
        List<Comment> comments = commentRepository.findAll();
        List<CommentDTO> dtos = commnentMapper.toDtos(comments);
        CommentDTO commentDTO = dtos.stream().filter(c -> c.getId().equals(id)).findFirst().orElse(null);
        Comment comment = commnentMapper.toEntity(commentDTO);
        commentRepository.delete(comment);
    }
}
