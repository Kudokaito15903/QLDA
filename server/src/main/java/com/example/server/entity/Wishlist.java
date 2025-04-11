package com.example.server.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "wishlist")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Wishlist {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "username")
    private String username;

    @Column(name ="product_id")
    private String productId;

}
