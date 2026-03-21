package com.fraud.fraud_detection.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class MLService {

    private final String ML_API_URL = "http://localhost:5000/predict";

    private final RestTemplate restTemplate = new RestTemplate();

    public int getFraudScore(String message) {

        try {
            Map<String, String> request = Map.of("message", message);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(ML_API_URL, entity, Map.class);

            Object scoreObj = response.getBody().get("fraudScore");

            return scoreObj != null ? (int) scoreObj : 0;

        } catch (Exception e) {
            System.out.println("ML API Error: " + e.getMessage());
            return 0; // safe fallback
        }
    }
}