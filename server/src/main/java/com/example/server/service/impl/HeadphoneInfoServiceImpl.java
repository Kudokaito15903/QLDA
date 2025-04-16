package com.example.server.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.server.dto.request.HeadphoneInfoRequest;
import com.example.server.dto.response.HeadphoneInfoResponse;
import com.example.server.entity.HeadphoneInfo;
import com.example.server.entity.Product;
import com.example.server.repositories.HeadphoneInfoRepository;
import com.example.server.repositories.ProductRepository;
import com.example.server.service.HeadphoneInfoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HeadphoneInfoServiceImpl implements HeadphoneInfoService {
    private final ProductRepository productRepository;
    private final HeadphoneInfoRepository headphoneInfoRepository;
    @Override
    public HeadphoneInfoResponse createHeadphoneInfo(HeadphoneInfoRequest request) {
        Product product = productRepository.findById(request.getProductID())
        .orElseThrow(() -> new RuntimeException("Product not found"));  
        HeadphoneInfo headphoneInfo = HeadphoneInfo.builder()
        .product(product)
        .headphone_type(request.getHeadphoneType())
        .speaker_size(request.getSpeakerSize())
        .speaker_sensitivity(request.getSpeakerSensitivity())
        .speaker_impedance(request.getSpeakerImpedance())
        .microphone_sensitivity(request.getMicrophoneSensitivity())
        .microphone_frequency_range(request.getMicrophoneFrequencyRange())
        .build();
        log.info("Creating headphone info: {}", headphoneInfo);
        headphoneInfoRepository.save(headphoneInfo);
        return toResponse(headphoneInfo);

    }

    @Override
    public List<HeadphoneInfoResponse> getAllHeadphoneInfo() {
        log.info("Getting all headphone info");
        return headphoneInfoRepository.findAll().stream()
        .map(this::toResponse)
        .collect(Collectors.toList());
    }

    @Override 
    public HeadphoneInfoResponse getHeadphoneInfoByProductId(Long productId) {
        List<HeadphoneInfo> headphoneInfo = headphoneInfoRepository.findAll();
        for (HeadphoneInfo info : headphoneInfo) {
            if (info.getProduct().getId().equals(productId)) {
                log.info("Getting headphone info by product id: {}", info);
                return toResponse(info);    
            }
        }
        throw new RuntimeException("Headphone info not found");
    }

    @Override
    public void deleteHeadphoneInfo(Long id){
        headphoneInfoRepository.deleteById(id);
    }
    @Override
    public HeadphoneInfoResponse updateHeadphoneInfo(Long productId, HeadphoneInfoRequest request) {
        List<HeadphoneInfo> headphoneInfo = headphoneInfoRepository.findAll();
        for (HeadphoneInfo info : headphoneInfo) {
            if (info.getProduct().getId().equals(productId)) {
                info.setHeadphone_type(request.getHeadphoneType());
                info.setSpeaker_size(request.getSpeakerSize());
                info.setSpeaker_sensitivity(request.getSpeakerSensitivity());
                info.setSpeaker_impedance(request.getSpeakerImpedance());
                info.setMicrophone_sensitivity(request.getMicrophoneSensitivity());
                info.setMicrophone_frequency_range(request.getMicrophoneFrequencyRange());
                headphoneInfoRepository.save(info);
                return toResponse(info);
            }
        }
        throw new RuntimeException("Headphone info not found");
    }
    public HeadphoneInfoResponse toResponse(HeadphoneInfo headphoneInfo) {
        Product product = headphoneInfo.getProduct();
        return HeadphoneInfoResponse.builder()
                .id(headphoneInfo.getId())
                .productId(product.getId())
                .productName(product.getName())
                .headphoneType(headphoneInfo.getHeadphone_type())
                .speakerSize(headphoneInfo.getSpeaker_size())
                .speakerSensitivity(headphoneInfo.getSpeaker_sensitivity())
                .speakerImpedance(headphoneInfo.getSpeaker_impedance())
                .microphoneSensitivity(headphoneInfo.getMicrophone_sensitivity())
                .microphoneFrequencyRange(headphoneInfo.getMicrophone_frequency_range())
                .build();
    }
}
        
