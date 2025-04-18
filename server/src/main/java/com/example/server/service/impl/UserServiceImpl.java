package com.example.server.service.impl;

import com.example.server.dto.request.UserRequest;
import com.example.server.dto.response.UserResponse;
import com.example.server.entity.User;
import com.example.server.repositories.UserRepository;
// import com.example.server.repositories.PasswordResetTokenRepository;
import com.example.server.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.example.server.repositories.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

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
    public UserResponse updateUser(Long id, UserRequest request) {
        try {
            User existingUser = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
            
            if (request != null) {
                updateUserFromRequest(existingUser, request);
                User updatedUser = userRepository.save(existingUser);
                return toResponse(updatedUser);
            }
            
            return toResponse(existingUser);
        } catch (Exception e) {
            if (e instanceof RuntimeException && e.getMessage().contains("User not found")) {
                throw e;
            }
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
    public boolean updatePassword(String email, String newPassword) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
            
            user.setPassword(newPassword);
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
        if(user.getPassword().equals(password)){
            return toResponse(user);
        }
        else{
            throw new RuntimeException("Invalid password");
        }
    }
 
    // @Override
    // public String generatePasswordResetToken(String email) {
    //     log.info("Generating password reset token for email: {}", email);
    //     User user = userRepository.findByEmail(email)
    //             .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        
    //     // Delete any existing tokens for this user
    //     passwordResetTokenRepository.findByUser(user).ifPresent(token -> {
    //         passwordResetTokenRepository.delete(token);
    //     });
        
    //     // Generate token
    //     String token = UUID.randomUUID().toString();
        
    //     // Set expiry date (24 hours)
    //     Calendar calendar = Calendar.getInstance();
    //     calendar.add(Calendar.DAY_OF_MONTH, 1);
        
    //     PasswordResetToken passwordResetToken = PasswordResetToken.builder()
    //             .token(token)
    //             .user(user)
    //             .expiryDate(calendar.getTime())
    //             .build();
        
    //     passwordResetTokenRepository.save(passwordResetToken);
    //     log.info("Password reset token generated successfully for user ID: {}", user.getId());
        
    //     return token;
    // }
    
    // @Override
    // public boolean resetPassword(String token, String newPassword) {
    //     log.info("Resetting password with token");
        
    //     PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
    //             .orElse(null);
        
    //     if (resetToken == null || resetToken.isExpired()) {
    //         log.warn("Invalid or expired password reset token");
    //         return false;
    //     }
        
    //     User user = resetToken.getUser();
        
    //     // Update password
    //     user.setPassword(newPassword);
    //     userRepository.save(user);
        
    //     // Delete used token
    //     passwordResetTokenRepository.delete(resetToken);
        
    //     log.info("Password reset successfully for user ID: {}", user.getId());
    //     return true;
    // }
    
    // @Override
    // public boolean validatePasswordResetToken(String token) {
    //     PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
    //             .orElse(null);
        
    //     if (resetToken == null || resetToken.isExpired()) {
    //         log.warn("Invalid or expired password reset token");
    //         return false;
    //     }
        
    //     return true;
    // }
    
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
    
    private void updateUserFromRequest(User user, UserRequest request) {
        if (request.getFullname() != null) {
            user.setFullname(request.getFullname());
        }
        if (request.getUsername() != null) {
            user.setUsername(request.getUsername());
        }
        if (request.getPassword() != null) {
            user.setPassword(request.getPassword());
        }
        if (request.getPhonenumber() != null) {
            user.setPhonenumber(request.getPhonenumber());
        }
        if (request.getAddress() != null) {
            user.setAddress(request.getAddress());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }
    }
}