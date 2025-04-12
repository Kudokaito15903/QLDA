package com.example.server.controller;

import java.sql.Date;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.server.dto.MailBody;
import com.example.server.dto.request.MailBodyRequest;
import com.example.server.entity.ForgotPassword;
import com.example.server.repositories.UserRepository;
import com.example.server.service.EmailService;
import com.example.server.service.ForgotPasswordService;
import com.example.server.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/forgot-password")
@RequiredArgsConstructor
public class ForgotPasswordController {
    private final EmailService emailService;
    private final ForgotPasswordService forgotPasswordService;
    private final UserService userService;

    @PostMapping("/verify-email/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        if (!userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        Integer otp = generateOTP();
        MailBodyRequest mailBody = new MailBodyRequest();
        mailBody.setTo(email);
        mailBody.setSubject("OTP for password reset");
        mailBody.setText("Your OTP is: " + otp);
        
        ForgotPassword forgotPassword = ForgotPassword.builder()
            .email(email)
            .expirationTime(new Date(System.currentTimeMillis() +  300 * 1000))
            .user(userService.findByEmail(email))
            .otp(otp)
            .build();
            
        forgotPasswordService.saveForgotPassword(forgotPassword);
        emailService.sendEmail(mailBody);
        
        return ResponseEntity.ok("Email verified successfully. OTP sent to your email.");
    }
    
    @PostMapping("/verifyOTP/{otp}/{email}")
    public ResponseEntity<String> verifyOTP(@PathVariable Integer otp, @PathVariable String email) {
        ForgotPassword forgotPassword = forgotPasswordService.findByEmailAndOtp(email, otp);
        if (forgotPassword != null) {
            return ResponseEntity.ok("OTP verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }
    }
    
    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePassword(@PathVariable String email, @RequestBody String newPassword) {
        try {
            boolean updated = userService.updatePassword(email, newPassword);
            if (updated) {
                // Remove the forgot password entry after successful password change
                forgotPasswordService.deleteByEmail(email);
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to change password");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error changing password: " + e.getMessage());
        }
    }
    
    private Integer generateOTP() {
        Random random = new Random();
        return random.nextInt(100000, 999999);
    }
}
