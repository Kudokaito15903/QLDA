package com.example.server.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
@Service
public interface ForgotPasswordService {
    public String verifyOTP(String email, Integer otp);
    public boolean verifyEmail(String email);
}