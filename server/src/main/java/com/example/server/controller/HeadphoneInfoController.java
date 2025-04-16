package com.example.server.controller;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.http.ResponseEntity;
import java.util.List;
import com.example.server.service.HeadphoneInfoService;
import com.example.server.dto.request.HeadphoneInfoRequest;
import com.example.server.dto.response.HeadphoneInfoResponse;
import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/headphone-info")
@Slf4j
@RequiredArgsConstructor
public class HeadphoneInfoController { 
    private final HeadphoneInfoService headphoneInfoService;

    @GetMapping
    public ResponseEntity<List<HeadphoneInfoResponse>> getAllHeadphoneInfos() {
        return ResponseEntity.ok(headphoneInfoService.getAllHeadphoneInfo());
    }
    @GetMapping("/{productId}")
    public ResponseEntity<HeadphoneInfoResponse> getHeadphoneInfoByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(headphoneInfoService.getHeadphoneInfoByProductId(productId));
    }
    @PutMapping("/{productId}")
    public ResponseEntity<HeadphoneInfoResponse> updateHeadphoneInfo(@PathVariable Long productId, @RequestBody HeadphoneInfoRequest request) {
        return ResponseEntity.ok(headphoneInfoService.updateHeadphoneInfo(productId, request));
    }
    @PostMapping("/create")
    public ResponseEntity<HeadphoneInfoResponse> createHeadphoneInfo(@RequestBody HeadphoneInfoRequest request) {
        return ResponseEntity.ok(headphoneInfoService.createHeadphoneInfo(request));
    }
    @DeleteMapping("/{headphoneId}")
    public ResponseEntity<String> deleteHeadphoneInfo(@PathVariable Long headphoneId) {
        headphoneInfoService.deleteHeadphoneInfo(headphoneId);
        return ResponseEntity.ok("Headphone info deleted successfully");
    }
} 

