package com.fraud.fraud_detection.service;

import com.fraud.fraud_detection.model.Transaction;
import com.fraud.fraud_detection.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    // Add transaction with fraud detection
    public Transaction addTransaction(Transaction t) {

        boolean isFraud = detectFraud(t);
        t.setFraud(isFraud);
        t.setTimestamp(LocalDateTime.now());

        return repository.save(t);
    }

    // Fraud detection logic (clean + correct)
    private boolean detectFraud(Transaction t) {

        // Rule 1: High amount
        if (t.getAmount() > 50000) {
            return true;
        }

        // Rule 2: Suspicious time (2 AM - 4 AM)
        int hour = LocalDateTime.now().getHour();
        if (hour >= 2 && hour <= 4) {
            return true;
        }

        // Rule 3: Too many small transactions (basic realistic logic)
        List<Transaction> all = repository.findAll();
        long smallTxCount = all.stream()
                .filter(tx -> tx.getAmount() < 1000)
                .count();

        if (smallTxCount > 5 && t.getAmount() < 1000) {
            return true;
        }

        return false;
    }

    // Get all transactions
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    // Get fraud transactions
    public List<Transaction> getFraudTransactions() {
        return repository.findByFraud(true);
    }
}