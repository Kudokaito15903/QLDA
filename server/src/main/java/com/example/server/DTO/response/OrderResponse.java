package com.example.server.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderResponse {
    private Long id;
    private String username;
    private String fullname;
    private String phonenumber;
    private String address;
    private String email;
    private LocalDateTime orderDate;
    private Integer totalPrice;
    private String paymentMethod;
    private Integer paid;
    private String deliveryState;
    private String status;
    private Long userId;
}
