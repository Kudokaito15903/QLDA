package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.server.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
}
