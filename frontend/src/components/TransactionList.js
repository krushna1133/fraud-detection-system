function TransactionList({ transactions }) {
    if (transactions.length === 0) {
        return (
            <div style={styles.emptyWrap}>
                <div style={styles.emptyIcon}>◈</div>
                <p style={styles.emptyTitle}>No transactions yet</p>
                <p style={styles.emptyDesc}>Submit a transaction to begin fraud analysis</p>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h2 style={styles.title}>Transaction Ledger</h2>
                <span style={styles.count}>{transactions.length} records</span>
            </div>

            <div style={styles.tableWrap}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {["#", "Amount", "Location", "Device", "Verdict"].map((h) => (
                                <th key={h} style={styles.th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, i) => (
                            <tr
                                key={i}
                                style={{
                                    ...styles.tr,
                                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                                    borderLeft: t.fraud ? "2px solid rgba(224,82,82,0.5)" : "2px solid transparent",
                                    animation: `fadeUp 0.4s ease ${i * 0.04}s both`,
                                }}
                            >
                                <td style={{ ...styles.td, color: "var(--text-muted)", fontSize: "12px" }}>
                                    {String(i + 1).padStart(2, "0")}
                                </td>
                                <td style={{ ...styles.td, fontFamily: "var(--font-display)", fontSize: "16px", color: "var(--text-primary)" }}>
                                    ₹{Number(t.amount).toLocaleString("en-IN")}
                                </td>
                                <td style={{ ...styles.td, color: "var(--text-secondary)" }}>
                                    <span style={styles.locationWrap}>
                                        <span style={styles.locationDot}>◎</span>
                                        {t.location}
                                    </span>
                                </td>
                                <td style={{ ...styles.td, color: "var(--text-secondary)" }}>
                                    <span style={styles.deviceChip}>{t.device}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.verdict,
                                        background: t.fraud ? "rgba(224,82,82,0.1)" : "rgba(62,207,142,0.1)",
                                        color: t.fraud ? "#e05252" : "#3ecf8e",
                                        border: `1px solid ${t.fraud ? "rgba(224,82,82,0.25)" : "rgba(62,207,142,0.25)"}`,
                                    }}>
                                        <span style={{
                                            width: "6px", height: "6px", borderRadius: "50%",
                                            background: t.fraud ? "#e05252" : "#3ecf8e",
                                            boxShadow: `0 0 6px ${t.fraud ? "#e05252" : "#3ecf8e"}`,
                                            flexShrink: 0,
                                        }} />
                                        {t.fraud ? "Fraudulent" : "Legitimate"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        height: "100%",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
        paddingBottom: "16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    title: {
        fontFamily: "var(--font-display)",
        fontSize: "24px",
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
    },
    count: {
        fontSize: "12px",
        color: "var(--gold)",
        background: "rgba(201,168,76,0.1)",
        border: "1px solid rgba(201,168,76,0.2)",
        padding: "4px 12px",
        borderRadius: "100px",
        fontWeight: 500,
        letterSpacing: "0.05em",
    },
    tableWrap: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    th: {
        textAlign: "left",
        padding: "10px 16px",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    tr: {
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        transition: "background 0.15s",
    },
    td: {
        padding: "14px 16px",
        fontSize: "14px",
        verticalAlign: "middle",
    },
    locationWrap: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    },
    locationDot: {
        color: "var(--gold)",
        fontSize: "12px",
        opacity: 0.6,
    },
    deviceChip: {
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "3px 10px",
        borderRadius: "100px",
        fontSize: "12px",
        color: "var(--text-secondary)",
    },
    verdict: {
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
    },
    emptyWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        gap: "12px",
    },
    emptyIcon: {
        fontSize: "40px",
        color: "var(--text-muted)",
        marginBottom: "8px",
    },
    emptyTitle: {
        fontFamily: "var(--font-display)",
        fontSize: "20px",
        color: "var(--text-secondary)",
        fontWeight: 400,
    },
    emptyDesc: {
        fontSize: "13px",
        color: "var(--text-muted)",
        fontWeight: 300,
    },
};

export default TransactionList;
