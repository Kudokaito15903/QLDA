package com.example.server.service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.server.dto.request.MailBodyRequest;  

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(MailBodyRequest mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailBody.getTo());
        message.setFrom("Ha2k03@gmail.com");
        message.setSubject(mailBody.getSubject());
        message.setText(mailBody.getText());
        
        mailSender.send(message);
    }
}
