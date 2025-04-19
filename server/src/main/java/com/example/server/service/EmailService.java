package com.example.server.service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.example.server.dto.request.MailBodyRequest;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor

public class EmailService {
    private final JavaMailSender mailSender;

    public void sendEmail(MailBodyRequest mailBodyRequest){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailBodyRequest.getFrom());
        message.setTo(mailBodyRequest.getTo());
        message.setSubject(mailBodyRequest.getSubject());
        message.setText(mailBodyRequest.getText());
        mailSender.send(message);
    }
}