package com.example.server.entity;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Table(name = "product")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Long id; //id of product
    
    @Column(name = "name")
    private String name;

    @Column(name = "selling_price")
    private Integer sellingPrice;

    @Column(name = "original_price")
    private Integer originalPrice;

    @Column(name ="image")
    private String image;

    @Column(name = "description")
    private String description;

    @Column(name = "sold")
    private Integer sold; //so luong ban duoc

    @Column(name ="product_type")
    private String productType;

    @Column(name ="brand")
    private String brand;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name ="created_date")
    private Date createdDate;
    
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;
  
    @OneToOne(mappedBy = "product")
    private ProductInfo productInfo;
    
    @OneToOne(mappedBy = "product")
    private HeadphoneInfo headphoneInfo;

    @OneToMany(mappedBy = "product")
    private List<Comment> comments;

    @OneToMany(mappedBy = "product")
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "product")
    private List<ProductAvailable> productAvailable;


    
}
