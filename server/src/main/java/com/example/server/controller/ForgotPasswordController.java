package com.example.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.dto.request.ChangePassword;
import com.example.server.service.ForgotPasswordService;
import com.example.server.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/forgotPassword")
@RequiredArgsConstructor
public class ForgotPasswordController {
    private final ForgotPasswordService forgotPasswordService;
    private final UserService userService;
    @PostMapping("/verifyEmail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
        forgotPasswordService.verifyEmail(email);
        return ResponseEntity.ok("Email verified");
    }
    @PostMapping("/verifyOTP/{email}/{otp}")
    public ResponseEntity<String> verifyOTP(@PathVariable String email, @PathVariable Integer otp) {
        forgotPasswordService.verifyOTP(email, otp);
        return ResponseEntity.ok("OTP verified");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePassword(@PathVariable String email, @RequestBody ChangePassword changePassword) {
        if(changePassword.getPassword().equals(changePassword.getRepeatPassword())){
            userService.updatePassword(email, changePassword);
            return ResponseEntity.ok("Password changed");
        }
        return ResponseEntity.badRequest().body("Password not match");
    }

}
