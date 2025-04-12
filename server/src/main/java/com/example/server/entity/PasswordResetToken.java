// package com.example.server.entity;

// import java.util.Date;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;
// import jakarta.persistence.Table;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @NoArgsConstructor
// @AllArgsConstructor
// @Data
// @Builder
// @Table(name = "password_reset_tokens")
// public class PasswordResetToken {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Integer id;
    
//     @Column(nullable = false, unique = true)
//     private String token;
    
//     @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
//     @JoinColumn(nullable = false, name = "user_id")
//     private User user;
    
//     @Column(nullable = false)
//     private Date expiryDate;
    
//     public boolean isExpired() {
//         return new Date().after(this.expiryDate);
//     }
// } 