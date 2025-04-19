package com.example.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.server.entity.ForgotPassword;
import com.example.server.entity.User;

import jakarta.transaction.Transactional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long>{
    @Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
    Optional<ForgotPassword> findByOtpAndUser(Integer otp, User user);

    @Query("select fp from ForgotPassword fp where fp.user.email = :email and fp.otp = :otp")
    Optional<ForgotPassword> findByEmailAndOtp(@Param("email") String email, @Param("otp") Integer otp);

    @Transactional
    @Modifying
    @Query("delete from ForgotPassword fp where fp.user.email = :email")
    void deleteByEmail(@Param("email") String email);

    void deleteByUser(User user);
}