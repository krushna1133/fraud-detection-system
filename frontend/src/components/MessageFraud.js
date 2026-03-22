import { useState } from "react";

function MessageFraud() {
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(null);

    const handleCheck = async () => {

        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }

        try {
            const res = await fetch(
                "http://localhost:8080/api/transactions/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message }),
                }
            );

            const data = await res.json();
            setScore(data.fraudScore);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-2xl font-semibold mb-4">💬 Message Fraud Detection</h2>

            <textarea
                className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Paste suspicious message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                onClick={handleCheck}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Check Fraud
            </button>

            {score !== null && (
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">Score: {score}/10</h3>

                    <p className={`mt-2 font-semibold ${score > 6 ? "text-red-500" : "text-green-500"}`}>
                        {score > 6 ? "⚠️ Likely Fraud" : "✅ Safe"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default MessageFraud;