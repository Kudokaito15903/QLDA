package com.example.server.entity;

import java.time.LocalDateTime;
import java.util.Date;

import com.example.server.dto.response.UserResponse;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "forgot_password")
public class ForgotPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fpid;

    @Column(nullable = false)
    private Integer otp;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Date expirationTime;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean used;
    
    @OneToOne
    private User user;
    
    public LocalDateTime getExpiryTime() {
        return expirationTime.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDateTime();
    }
}
