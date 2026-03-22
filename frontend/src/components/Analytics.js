function Analytics({ transactions = [] }) {
    const total = transactions.length;
    const frauds = transactions.filter(t => t.fraud).length;
    const percent = total ? ((frauds / total) * 100).toFixed(1) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white p-5 rounded-2xl shadow">
                <p className="text-gray-500 text-sm">Total Transactions</p>
                <h2 className="text-2xl font-bold">{total}</h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
                <p className="text-gray-500 text-sm">Fraud Transactions</p>
                <h2 className="text-2xl font-bold text-red-500">{frauds}</h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
                <p className="text-gray-500 text-sm">Fraud %</p>
                <h2 className="text-2xl font-bold">{percent}%</h2>
            </div>

        </div>
    );
}

export default Analytics;