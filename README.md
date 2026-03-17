# 🚨 Fraud Detection System (Spring Boot + React)

## 📌 Overview

A full-stack fraud detection system that analyzes financial transactions and flags suspicious activity using rule-based logic.

---

# 🛠️ Requirements (Install Before Starting)

Make sure you have:

* Java 17
* Node.js (v16 or higher)
* Maven (or use mvnw wrapper)
* Git
* VS Code / IntelliJ

---

# 📁 Project Structure

```
fraud-detection-system/
│
├── backend/      → Spring Boot API
├── frontend/     → React App
└── README.md
```

---

# 🚀 Step-by-Step Setup

---

## 🔹 Step 1: Create Project Folder

```
mkdir fraud-detection-system
cd fraud-detection-system
```

---

## 🔹 Step 2: Create Backend (Spring Boot)

### Option: Using Spring Initializr (VS Code / Browser)

* Project: Maven
* Language: Java
* Spring Boot: Latest
* Group: com.fraud
* Artifact: fraud-detection

### Add Dependencies:

* Spring Web
* Spring Data JPA
* MySQL Driver
* Lombok

👉 Generate project and place inside `backend/`

---

## 🔹 Step 3: Configure Database (H2 for development)

Edit:

```
backend/src/main/resources/application.properties
```

Add:

```
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

---

## 🔹 Step 4: Run Backend

```
cd backend
./mvnw spring-boot:run
```

👉 Runs on:

```
http://localhost:8080
```

---

## 🔹 Step 5: Create Backend Structure

Inside:

```
src/main/java/com/fraud/fraud_detection/
```

Create packages:

```
model/
repository/
service/
controller/
```

---

## 🔹 Step 6: Create Entity (Transaction)

* Fields: amount, location, device, timestamp, fraud
* Use `@Entity` annotation

---

## 🔹 Step 7: Create Repository

* Extend `JpaRepository`
* Add custom methods like:

  * findByFraud(true)

---

## 🔹 Step 8: Create Service Layer

* Add fraud detection logic:

  * High amount (>50000)
  * Suspicious time (2–4 AM)
  * Multiple small transactions

---

## 🔹 Step 9: Create Controller

Endpoints:

```
POST /api/transactions
GET /api/transactions
GET /api/transactions/fraud
```

---

## 🔹 Step 10: Add Swagger (API Docs)

Add dependency:

```
org.springdoc:springdoc-openapi-starter-webmvc-ui
```

Access:

```
http://localhost:8080/swagger-ui/index.html
```

---

## 🔹 Step 11: Create Frontend (React)

```
cd ../frontend
npx create-react-app .
npm install
npm start
```

👉 Runs on:

```
http://localhost:3000
```

---

## 🔹 Step 12: Connect Frontend to Backend

Use fetch API:

```
http://localhost:8080/api/transactions
```

---

## 🔹 Step 13: Build UI

Features:

* Add transaction form
* Transaction table
* Fraud status (Safe / Fraud)
* Analytics (total, fraud %, count)

---

# 🧠 Fraud Detection Logic

* Amount > 50000 → Fraud
* Time between 2–4 AM → Fraud
* Many small transactions → Suspicious

---

# 📊 Features

* Full-stack application
* REST API with Swagger
* Real-time fraud detection
* Dashboard with analytics

---

# 🚀 Future Improvements

* JWT Authentication
* Machine Learning model
* Cloud deployment (AWS / Railway)
* Real-time monitoring

---

