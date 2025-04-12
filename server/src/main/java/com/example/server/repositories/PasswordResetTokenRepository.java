// package com.example.server.repositories;

// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.example.server.entity.PasswordResetToken;
// import com.example.server.entity.User;

// @Repository
// public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
//     Optional<PasswordResetToken> findByToken(String token);
//     Optional<PasswordResetToken> findByUser(User user);
//     void deleteByUser(User user);
// } 