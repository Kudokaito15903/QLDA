package com.example.server.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.example.server.common.Gender;
import jakarta.validation.constraints.Pattern;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequet {
    @Size(max = 255, message = "Full name must not exceed 255 characters")
    private String fullname;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Invalid phone number format")
    private String phonenumber;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private Gender gender;
}
