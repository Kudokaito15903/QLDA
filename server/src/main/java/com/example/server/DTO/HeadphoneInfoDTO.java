package com.example.server.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HeadphoneInfoDTO {
    private Integer id;
    private String productID;
    private String headphone_type;
    private String speaker_size;
    private String speaker_sensitivity;
    private String speaker_impedance;
    private String microphone_sensitivity;
    private String microphone_frequency_range;
}
