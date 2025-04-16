package com.example.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.service.EmailService;

@RestController

public class MailController {
    private final EmailService emailService;

    public MailController(EmailService emailService) {
        this.emailService = emailService;
    }


    @GetMapping("/send-email")
    public String sendEmail() {
        emailService.sendSimpleEmail(
            "hau2k03@gmail.com",
            "Xin chào từ Spring Boot",
            "Đây là nội dung email gửi bằng Spring Boot!"
        );
        return "Email đã được gửi!";
    }
    @GetMapping("/mail")
    public String mail() {
        return "Email đã được gửi!";
    }
}
