function TransactionList({ transactions }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">

            <h2 className="text-xl font-semibold mb-4">Transactions</h2>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="p-2">Amount</th>
                        <th className="p-2">Location</th>
                        <th className="p-2">Device</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((t, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                            <td className="p-2">{t.amount}</td>
                            <td className="p-2">{t.location}</td>
                            <td className="p-2">{t.device}</td>
                            <td className={`p-2 font-semibold ${t.fraud ? "text-red-500" : "text-green-500"}`}>
                                {t.fraud ? "Fraud" : "Safe"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default TransactionList;