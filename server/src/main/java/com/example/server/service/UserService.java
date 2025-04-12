package com.example.server.service;

import com.example.server.dto.request.UserRequest;
import com.example.server.dto.response.UserResponse;
import com.example.server.entity.User;

import java.util.List;

public interface UserService {
    List<UserResponse> findAll();
    UserResponse save(UserRequest user);
    void deleteById(Integer id);
    List<UserResponse> searchUsers(String username, String email);
    UserResponse updateUser(Integer id, UserRequest request);
    UserResponse findById(Integer id);
    boolean existsByEmail(String email);
    boolean updatePassword(String email, String newPassword);
    User findByEmail(String email);
    // // Password reset methods
    // boolean existsByEmail(String email);
    // String generatePasswordResetToken(String email);
    // boolean resetPassword(String token, String newPassword);
    // boolean validatePasswordResetToken(String token);
}
