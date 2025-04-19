package com.example.server.service;

import com.example.server.dto.request.UserRequest;
import com.example.server.dto.response.UserResponse;
import com.example.server.entity.User;
import com.example.server.dto.request.ChangePassword;
import com.example.server.dto.request.UpdateUserRequet;
import java.util.List;
import java.util.Map;
public interface UserService {
    List<UserResponse> findAll();
    UserResponse save(UserRequest user);
    void deleteById(Long id);
    List<UserResponse> searchUsers(String username, String email);
    UserResponse updateUser(Long id, UpdateUserRequet request);
    UserResponse findById(Long id);
    boolean existsByEmail(String email);
    boolean updatePassword(String email, ChangePassword changePassword);
    User findByEmail(String email);
    UserResponse login(String username, String password);
    Map<String, Object> graph_users();
}
