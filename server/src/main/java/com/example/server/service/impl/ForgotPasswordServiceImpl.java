package com.example.server.service.impl;

import org.springframework.stereotype.Service;

import com.example.server.dto.request.MailBodyRequest;
import com.example.server.entity.ForgotPassword;
import com.example.server.entity.User;
import com.example.server.repositories.ForgotPasswordRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.service.ForgotPasswordService;
import com.example.server.service.EmailService;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ForgotPasswordServiceImpl implements ForgotPasswordService {
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
   
  
    @Override
    public boolean verifyEmail(String email) {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Email not found"));
        forgotPasswordRepository.deleteByUser(user);
        Integer otp = otpGenerator();
        ForgotPassword forgotPassword = ForgotPassword.builder()
        .otp(otp)
        .user(user)
        .expirationTime(new Date(System.currentTimeMillis() + 300* 1000))
        .build();
        forgotPasswordRepository.save(forgotPassword);
        
        MailBodyRequest mailBodyRequest = MailBodyRequest.builder()
        .to(email)
        .subject("Forgot Password OTP")
        .text("Your OTP is " + otp)
        .build();

        emailService.sendEmail(mailBodyRequest);
        return true;
    }
    @Override
    public boolean verifyOTP(String email, Integer otp) {
        Optional<ForgotPassword> forgotPasswordOpt = forgotPasswordRepository.findByEmailAndOtp(email, otp);
        if(forgotPasswordOpt.get().getExpirationTime().before(Date.from(Instant.now()))){
            forgotPasswordRepository.delete(forgotPasswordOpt.get());
            return true;
        }
        return false;
    }
    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000, 999999);
    }

}