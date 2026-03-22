import os
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model once (important)
model = joblib.load("fraud_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        message = data.get("message", "")

        if not message:
            return jsonify({"error": "Message is required"}), 400

        msg_vec = vectorizer.transform([message])
        prob = model.predict_proba(msg_vec)[0][1]

        score = int(prob * 10)

        return jsonify({
            "fraudScore": score
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))