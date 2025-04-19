package com.example.server.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.server.dto.request.MailBodyRequest;
import com.example.server.entity.ForgotPassword;
import com.example.server.entity.User;
import com.example.server.repositories.ForgotPasswordRepository;
import com.example.server.repositories.UserRepository;
import com.example.server.service.ForgotPasswordService;
import com.example.server.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class ForgotPasswordServiceImpl implements ForgotPasswordService {
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
   
    @Override
    @Transactional
    public boolean verifyEmail(String email) {
        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Email not found"));
        forgotPasswordRepository.deleteByUser(user.getId());
        log.info("Deleted all forgot password records for user: {}", user.getEmail());
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
    @Transactional
    public String verifyOTP(String email, Integer otp) {
        Optional<ForgotPassword> forgotPasswordOpt = forgotPasswordRepository.findByEmailAndOtp(email, otp);
        if (forgotPasswordOpt.isPresent()){
            if(forgotPasswordOpt.get().getExpirationTime().before(Date.from(Instant.now()))){
                forgotPasswordRepository.deleteByEmail(email);
                log.info("Deleted forgot password record for user: {}", email);
                return "OTP expired";
            }
            forgotPasswordRepository.deleteByEmail(email);
            return "OTP verified";
        }
        return "OTP not verified";
    }
    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100000, 999999);
    }

}