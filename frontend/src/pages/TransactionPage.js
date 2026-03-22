import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Analytics from "../components/Analytics";
import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";
import { useNavigate } from "react-router-dom";

function TransactionPage() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await getTransactions();
        setTransactions(data || []);
    };

    const handleAdd = (newTx) => {
        setTransactions((prev) => [...prev, newTx]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate("/")}
                    className="bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-200"
                >
                    ⬅ Back
                </button>

                <h1 className="text-2xl font-bold">
                    💳 Transaction Fraud Detection
                </h1>
            </div>

            {/* Analytics Cards */}
            <div className="mb-6">
                <Analytics transactions={transactions} />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Form */}
                <div className="bg-white p-6 rounded-2xl shadow col-span-1">
                    <TransactionForm onAdd={handleAdd} />
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-2xl shadow col-span-2">
                    <TransactionList transactions={transactions} />
                </div>

            </div>

        </div>
    );
}

export default TransactionPage;