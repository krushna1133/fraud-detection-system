import { useState } from "react";
import { addTransaction } from "../services/api";

function TransactionForm({ onAdd }) {
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [device, setDevice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await addTransaction({
            amount: Number(amount),
            location,
            device
        });

        onAdd(res);

        setAmount("");
        setLocation("");
        setDevice("");
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    className="w-full border p-2 rounded-lg"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <input
                    className="w-full border p-2 rounded-lg"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <input
                    className="w-full border p-2 rounded-lg"
                    placeholder="Device"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                />

                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>

            </form>
        </div>
    );
}

export default TransactionForm;