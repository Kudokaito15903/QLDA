package com.example.server.service;

import java.util.List;

import com.example.server.dto.request.HeadphoneInfoRequest;
import com.example.server.dto.response.HeadphoneInfoResponse;

public interface HeadphoneInfoService {
    HeadphoneInfoResponse createHeadphoneInfo(HeadphoneInfoRequest request);
    List<HeadphoneInfoResponse> getAllHeadphoneInfo();
    HeadphoneInfoResponse getHeadphoneInfoByProductId(Long productId);
    HeadphoneInfoResponse updateHeadphoneInfo(Long productId, HeadphoneInfoRequest request);
    void deleteHeadphoneInfo(Long id);

}
