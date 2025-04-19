package com.example.server.service.impl;

import com.example.server.dto.request.UserRequest;
import com.example.server.dto.response.UserResponse;
import com.example.server.entity.User;
import com.example.server.repositories.UserRepository;
import com.example.server.service.UserService;
import com.example.server.dto.request.ChangePassword;
import com.example.server.dto.request.UpdateUserRequet;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserResponse> findAll() {
        try {
            List<User> users = userRepository.findAll();
            return users.stream()
                        .map(this::toResponse)
                        .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public UserResponse save(UserRequest request) {
        try {
            User user = toEntity(request);
            User savedUser = userRepository.save(user);
            return toResponse(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error saving user: " + e.getMessage());
        }
    }

    @Override
    public void deleteById(Long id) {
        try {
            User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
            user.setIsActive(false);
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error deleting user: " + e.getMessage());
        }
    }

    @Override
    public List<UserResponse> searchUsers(String username, String email) {
        try {
            List<User> users;
            if (username != null && !username.isEmpty() && email != null && !email.isEmpty()) {
                users = userRepository.findByUsernameContainingAndEmailContaining(username, email);
                log.info("Found {} users matching username and email", users.size());
            } else if (username != null && !username.isEmpty()) {
                users = userRepository.findByUsernameContaining(username);
                log.info("Found {} users matching username", users.size());
            } else if (email != null && !email.isEmpty()) {
                users = userRepository.findByEmailContaining(email);
                log.info("Found {} users matching email", users.size());
            } else {
                users = userRepository.findAll();
                log.info("Found {} users in total", users.size());
            }
            return users.stream()
                    .map(this::toResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequet request) {
        try {
            User existingUser = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
            existingUser.setFullname(request.getFullname());
            existingUser.setUsername(request.getUsername());
            existingUser.setPhonenumber(request.getPhonenumber());
            existingUser.setAddress(request.getAddress());
            existingUser.setEmail(request.getEmail());
            existingUser.setGender(request.getGender());
            User updatedUser = userRepository.save(existingUser);
            return toResponse(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating user: " + e.getMessage());
        }
    }
    
    @Override
    public UserResponse findById(Long id) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
            return toResponse(user);
        } catch (Exception e) {
            if (e instanceof RuntimeException && e.getMessage().contains("User not found")) {
                throw e;
            }
            e.printStackTrace();
            throw new RuntimeException("Error finding user: " + e.getMessage());
        }
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    @Override
    public User findByEmail(String email) {
        return (userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email)));
    }
    
    @Override
    public boolean updatePassword(String email, ChangePassword changePassword) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            
            user.setPassword(changePassword.getPassword());
            userRepository.save(user);
            log.info("Password updated successfully for user with email: {}", email);
            return true;
        } catch (Exception e) {
            log.error("Error updating password for user with email: {}", email, e);
            return false;
        }
    }
    @Override
    public UserResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
        if(user.getPassword().equals(password) && user.getIsActive()){
            return toResponse(user);
        }
        else{
            throw new RuntimeException("Invalid password or account is not active");
        }
    }
    @Override
    public Map<String, Object> graph_users() {
        Map<String, Object> responses = new HashMap<>();
        List<User> users = userRepository.findAll();
        int total_user = users.size();
        Map<String,Integer> UserByDay = new HashMap<>();
        for(User user : users){
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            String date = format.format(user.getCreatedAt());
            UserByDay.put(date, UserByDay.getOrDefault(date, 0) + 1);
        }
        responses.put("total_user", total_user);
        responses.put("UserByDay", UserByDay);
        return responses;
    }
     
    private User toEntity(UserRequest request) {
        return User.builder()
                .fullname(request.getFullname())
                .username(request.getUsername())
                .password(request.getPassword())
                .phonenumber(request.getPhonenumber())
                .address(request.getAddress())
                .email(request.getEmail())
                .gender(request.getGender())
                .isActive(true)
                .build();
    }
    
    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullname(user.getFullname())
                .username(user.getUsername())
                .phonenumber(user.getPhonenumber())
                .address(user.getAddress())
                .email(user.getEmail())
                .gender(user.getGender())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .isActive(user.getIsActive())
                .build();
    }
    
  
}