package com.example.server.entity;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import com.example.server.common.Gender;
import jakarta.persistence.*; 
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Entity class representing a user in the system
 */
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * User's full name
     */
   
    @Size(max = 255, message = "Full name must not exceed 255 characters")
    @Column(name = "fullname", length = 255)
    private String fullname;

    /**
     * Unique username for login
     */
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(name = "username", length = 255, unique = true)
    private String username;

    /**
     * User's password (should be encrypted)
     */
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(name = "password", length = 255)
    private String password;

    /**
     * User's phone number
     */
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number format")
    @Column(name = "phonenumber", length = 255)
    private String phonenumber;

    /**
     * User's address
     */
    @Size(max = 255, message = "Address must not exceed 255 characters")
    @Column(name = "address", length = 255)
    private String address;

    /**
     * User's email address
     */
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", length = 255, unique = true)
    private String email;

    /**
     * User's gender
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    /**
     * Account creation timestamp
     */
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdAt;

    /**
     * Last modification timestamp
     */
    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    /**
     * Account status
     */
    @Column(name = "is_active")
    private Boolean isActive;

    @OneToOne(mappedBy = "user")
    private ForgotPassword forgotPassword;

    @OneToMany(mappedBy = "user")
    private List<Wishlist> wishlists;
    
    @OneToMany(mappedBy = "user")
    private List<Comment> comments;
    
    @OneToMany(mappedBy = "user")
    private List<Order> orders;
}

