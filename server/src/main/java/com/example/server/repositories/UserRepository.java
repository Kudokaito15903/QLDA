package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.server.entity.User;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1 where u.email = ?2")
    void updatePassword(String password, String email);

    @Transactional
    @Modifying
    @Query("update User u set u.fullname = ?1, u.phonenumber = ?2, u.address = ?3 where u.email = ?4")
    void updateUserProfile(String fullname, String phonenumber, String address, String email);

    List<User> findByUsernameContaining(String username);
    List<User> findByEmailContaining(String email);
    List<User> findByUsernameContainingAndEmailContaining(String username, String email);
}
