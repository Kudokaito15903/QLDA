package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class HeadphoneResponse {
    private Long id;
    private String headphone_type;
    private String speaker_size;
    private String speaker_sensitivity;
    private String speaker_impedance;
    private String microphone_sensitivity;
    private String microphone_frequency_range;
}
