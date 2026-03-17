package com.fraud.fraud_detection.controller;

import com.fraud.fraud_detection.model.Transaction;
import com.fraud.fraud_detection.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // allow frontend later
public class TransactionController {

    @Autowired
    private TransactionService service;

    // 1. Add transaction
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction t) {
        return service.addTransaction(t);
    }

    // 2. Get all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return service.getAllTransactions();
    }

    // 3. Get fraud transactions
    @GetMapping("/fraud")
    public List<Transaction> getFraudTransactions() {
        return service.getFraudTransactions();
    }
}