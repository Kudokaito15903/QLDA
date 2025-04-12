package com.example.server.service.impl;

import org.springframework.stereotype.Service;
import com.example.server.entity.ForgotPassword;
import com.example.server.repositories.ForgotPasswordRepository;
import com.example.server.service.ForgotPasswordService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForgotPasswordServiceImpl implements ForgotPasswordService {
    private final ForgotPasswordRepository forgotPasswordRepository;
    
    @Override
    public ForgotPassword saveForgotPassword(ForgotPassword forgotPassword) {
        return forgotPasswordRepository.save(forgotPassword);
    }
    
    @Override
    public boolean verifyOTP(String email, Integer otp) {
        ForgotPassword forgotPassword = forgotPasswordRepository.findByEmailAndOtpAndUsedFalse(email, otp)
            .orElse(null);
        
        if (forgotPassword == null) {
            return false;
        }
        
        if (forgotPassword.getExpiryTime().isBefore(java.time.LocalDateTime.now())) {
            return false;
        }
        
        // Mark OTP as used
        forgotPassword.setUsed(true);
        forgotPasswordRepository.save(forgotPassword);
        return true;
    }
    
    @Override
    public ForgotPassword findByEmailAndOtp(String email, Integer otp) {
        return forgotPasswordRepository.findByEmailAndOtpAndUsedFalse(email, otp)
            .orElse(null);
    }
    
    @Override
    public void deleteByEmail(String email) {
        forgotPasswordRepository.deleteByEmail(email);
    }
}