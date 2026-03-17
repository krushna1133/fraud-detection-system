package com.fraud.fraud_detection.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    private String location;

    private String device;

    private LocalDateTime timestamp;

    private Boolean fraud = false;

    // Constructors
    public Transaction() {
    }

    // public Transaction(double amount, String location, String device,
    // LocalDateTime timestamp, boolean fraud) {
    // this.amount = amount;
    // this.location = location;
    // this.device = device;
    // this.timestamp = timestamp;
    // this.fraud = fraud;
    // }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getFraud() {
        return fraud;
    }

    public void setFraud(Boolean fraud) {
        this.fraud = fraud;
    }
}