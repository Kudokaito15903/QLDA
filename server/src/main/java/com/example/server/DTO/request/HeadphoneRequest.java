package com.example.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class HeadphoneRequest {
    private Integer id;
    private String productID;
    private String headphone_type;
    private String speaker_size;
    private String speaker_sensitivity;
    private String speaker_impedance;
    private String microphone_sensitivity;
    private String microphone_frequency_range;
}
