package com.example.server.service;

import org.springframework.stereotype.Service;

import com.example.server.entity.ForgotPassword;
@Service
public interface ForgotPasswordService {
    public ForgotPassword saveForgotPassword(ForgotPassword forgotPassword);
    public boolean verifyOTP(String email, Integer otp);
    public ForgotPassword findByEmailAndOtp(String email, Integer otp);
    public void deleteByEmail(String email);
}