import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center">

            <h1 className="text-4xl font-bold mb-4 text-gray-800">
                🚨 Fraud Detection System
            </h1>

            <p className="text-gray-600 mb-10">
                Choose how you want to detect fraud
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Card 1 */}
                <div
                    onClick={() => navigate("/transaction")}
                    className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <h2 className="text-xl font-semibold mb-2">💳 Transaction Fraud</h2>
                    <p className="text-gray-500">
                        Detect fraud based on transaction details like amount, location and behavior.
                    </p>
                </div>

                {/* Card 2 */}
                <div
                    onClick={() => navigate("/message")}
                    className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <h2 className="text-xl font-semibold mb-2">💬 Message Fraud</h2>
                    <p className="text-gray-500">
                        Analyze suspicious messages using machine learning.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Home;