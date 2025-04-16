package com.example.server.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@Builder
public class HeadphoneInfoResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String headphoneType;
    private String speakerSize;
    private String speakerSensitivity;
    private String speakerImpedance;
    private String microphoneSensitivity;
    private String microphoneFrequencyRange;
}
