# 🚨 Fraud Detection System (Spring Boot + React + ML)

## 📌 Overview

A full-stack fraud detection system that:

* Detects fraud in transactions (rule-based)
* Detects fraud in messages (ML-based)

---

# 🛠️ Requirements

Install before starting:

* Java 17
* Node.js (v16+)
* Python 3.x
* Maven
* Git

---

# 📁 Project Structure

```
fraud-detection-system/
│
├── backend/        → Spring Boot API
├── frontend/       → React App
├── ml-model/       → ML Model + Flask API
└── README.md
```

---

# 🚀 How to Run the Project (IMPORTANT)

⚠️ You must run **3 things simultaneously**:

---

# 🔹 Step 1: Run ML Model (Flask API)

```bash
cd ml-model
pip install flask pandas scikit-learn joblib
python ml_api.py
```

👉 Runs on:

```
http://localhost:5000
```

---

# 🔹 Step 2: Run Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

👉 Runs on:

```
http://localhost:8080
```

---

# 🔹 Step 3: Run Frontend (React)

```bash
cd frontend
npm install
npm start
```

👉 Runs on:

```
http://localhost:3000
```

---

# 🔗 How System Works

```
Frontend → Spring Boot → Flask ML API → Model → Response → UI
```

---

# 🧠 Fraud Detection Features

## 1️⃣ Transaction Fraud Detection

Rules:

* Amount > 50000 → Fraud
* Suspicious time (2–4 AM)
* Location anomaly

---

## 2️⃣ Message Fraud Detection (ML)

* User pastes message
* ML model predicts fraud score (0–10)

---

# 🔌 API Endpoints

## Transaction APIs

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| POST   | /api/transactions       | Add transaction |
| GET    | /api/transactions       | Get all         |
| GET    | /api/transactions/fraud | Fraud only      |

---

## ML API (via Spring Boot)

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| POST   | /api/transactions/predict | Predict fraud message |

---

# 🧪 Sample Request (ML)

```json
{
  "message": "You won ₹1,00,000 click now"
}
```

Response:

```json
{
  "fraudScore": 9
}
```

---

# 🎨 Frontend Features

* Dashboard UI
* KPI Analytics cards
* Transaction table
* Message fraud detection UI
* Clean navigation (Home → Feature pages)

---

# ⚙️ Technologies Used

* Spring Boot
* React.js
* Flask
* scikit-learn
* Tailwind CSS

---

# ⚠️ Notes

* Flask must be running before prediction
* Backend depends on ML API
* Using H2 (default) or MySQL

---

# 🚀 Future Improvements

* JWT Authentication
* Better ML model (BERT)
* Cloud deployment
* Real-time fraud monitoring

---
