package com.example.server.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.server.entity.ForgotPassword;

import jakarta.transaction.Transactional;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long>{

    @Query("select fp from ForgotPassword fp where fp.user.email = :email and fp.otp = :otp")
    Optional<ForgotPassword> findByEmailAndOtp(@Param("email") String email, @Param("otp") Integer otp);

    @Transactional
    @Modifying
    @Query("delete from ForgotPassword fp where fp.user.email = :email")
    void deleteByEmail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("delete from ForgotPassword fp where fp.user.id = :id")
    void deleteByUser(@Param("id") Long id);
}