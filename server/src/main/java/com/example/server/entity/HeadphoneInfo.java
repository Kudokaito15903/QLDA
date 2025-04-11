package com.example.server.entity; 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Table(name = "headphone_info")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class HeadphoneInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id")
    private Integer id;
    @Column(name = "product_id")
    private String productID;
    @Column(name = "headphone_type")
    private String headphone_type;
    @Column(name = "speaker_size")
    private String speaker_size;
    @Column(name = "speaker_sensitivity")
    private String speaker_sensitivity;
    @Column(name = "speaker_impedance")
    private String speaker_impedance;
    @Column(name = "microphone_sensitivity")
    private String microphone_sensitivity;
    @Column(name = "microphone_frequency_range")
    private String microphone_frequency_range;
}
