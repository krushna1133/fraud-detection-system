package com.fraud.fraud_detection.repository;

import com.fraud.fraud_detection.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Custom query methods (Spring auto-implements these)

    List<Transaction> findByFraud(boolean fraud);

    List<Transaction> findByLocation(String location);
}