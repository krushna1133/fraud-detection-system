import joblib

# Load model
model = joblib.load("fraud_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

def predict_message(msg):
    msg_vec = vectorizer.transform([msg])
    prob = model.predict_proba(msg_vec)[0][1]

    score = int(prob * 10)
    return score

# Test
msg = input("Enter message: ")
score = predict_message(msg)

print(f"Fraud Score (0-10): {score}")