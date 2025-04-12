package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class OrderDTO {

    private String orderID;
    private String username;
    private String fullname;
    private String status;
    private String phonenumber;

    private String address;

    private String email;

    private String order_date;

    private Integer totalPrice;
    private String payment_method;
    private Integer paid;
    private String delivery_state;
}
