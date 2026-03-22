const BASE_URL = "http://localhost:8080/api/transactions";

export const addTransaction = async (data) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const getTransactions = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};

export const getFraudTransactions = async () => {
    const response = await fetch(`${BASE_URL}/fraud`);
    return response.json();
};