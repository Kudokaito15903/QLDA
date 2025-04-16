package com.example.server.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter 
@Setter 
@AllArgsConstructor 
@Builder
public class HeadphoneInfoRequest {
    @NotBlank
    private Long productID;
    private String headphoneType;
    private String speakerSize;
    private String speakerSensitivity;
    private String speakerImpedance;
    private String microphoneSensitivity;
    private String microphoneFrequencyRange;

}
