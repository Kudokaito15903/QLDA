package com.example.server.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name ="user_order")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Order {
    @Id
    @Column(name = "order_id")
    private String orderID;

    @Column(name ="status")
    private String status;
    
    @Column(name ="username")
    private String username;

    @Column(name = "fullname")
    private String fullname;
    
    @Column(name = "phonenumber")
    private String phonenumber;
    
    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;
    
    @Column(name ="order_date")
    private String order_date;
    
    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "payment_method")
    private String payment_method;

    @Column(name ="paid")
    private Integer paid;

    @Column(name ="delivery_state")
    private String delivery_state;
}
