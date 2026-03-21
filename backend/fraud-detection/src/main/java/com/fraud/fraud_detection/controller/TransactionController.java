package com.fraud.fraud_detection.controller;

import com.fraud.fraud_detection.model.Transaction;
import com.fraud.fraud_detection.service.TransactionService;
import com.fraud.fraud_detection.service.MLService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @Autowired
    private MLService mlService;

    // 🔹 ML Fraud Prediction API
    @PostMapping("/predict")
    public Map<String, Object> predictFraud(@RequestBody Map<String, String> req) {

        String message = req.get("message");

        if (message == null || message.trim().isEmpty()) {
            return Map.of("error", "Message is required");
        }

        int score = mlService.getFraudScore(message);

        return Map.of("fraudScore", score);
    }

    // 🔹 Add transaction
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction t) {
        return service.addTransaction(t);
    }

    // 🔹 Get all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    // 🔹 Get fraud transactions
    @GetMapping("/fraud")
    public List<Transaction> getFraudTransactions() {
        return service.getFraudTransactions();
    }
}