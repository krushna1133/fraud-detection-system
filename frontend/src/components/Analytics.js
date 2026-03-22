function Analytics({ transactions = [] }) {
    const total = transactions.length;
    const frauds = transactions.filter(t => t.fraud).length;
    const percent = total ? ((frauds / total) * 100).toFixed(1) : 0;
    const safe = total - frauds;

    const cards = [
        {
            label: "Total Transactions",
            value: total,
            icon: "◈",
            sub: "All time records",
            accent: "#4a90d9",
            bg: "rgba(74,144,217,0.08)",
            border: "rgba(74,144,217,0.18)",
        },
        {
            label: "Flagged Fraudulent",
            value: frauds,
            icon: "⚠",
            sub: frauds > 0 ? "Requires attention" : "None detected",
            accent: "#e05252",
            bg: "rgba(224,82,82,0.08)",
            border: "rgba(224,82,82,0.2)",
        },
        {
            label: "Fraud Rate",
            value: `${percent}%`,
            icon: "◎",
            sub: `${safe} transactions safe`,
            accent: percent > 20 ? "#e05252" : percent > 10 ? "#c9a84c" : "#3ecf8e",
            bg: percent > 20 ? "rgba(224,82,82,0.08)" : percent > 10 ? "rgba(201,168,76,0.08)" : "rgba(62,207,142,0.08)",
            border: percent > 20 ? "rgba(224,82,82,0.2)" : percent > 10 ? "rgba(201,168,76,0.2)" : "rgba(62,207,142,0.2)",
        },
    ];

    return (
        <div style={styles.grid}>
            {cards.map((card, i) => (
                <div
                    key={i}
                    style={{
                        ...styles.card,
                        background: `linear-gradient(135deg, ${card.bg} 0%, rgba(13,21,38,0.6) 100%)`,
                        border: `1px solid ${card.border}`,
                        animationDelay: `${i * 0.1}s`,
                    }}
                >
                    <div style={styles.topRow}>
                        <span style={{ ...styles.icon, color: card.accent, background: `${card.accent}15` }}>
                            {card.icon}
                        </span>
                        <div style={{ ...styles.dot, background: card.accent, boxShadow: `0 0 8px ${card.accent}` }} />
                    </div>

                    <div style={styles.value} data-accent={card.accent}>
                        <span style={{ color: card.accent }}>{card.value}</span>
                    </div>

                    <p style={styles.label}>{card.label}</p>
                    <p style={{ ...styles.sub, color: card.accent + "aa" }}>{card.sub}</p>

                    {/* Progress line */}
                    <div style={styles.progressTrack}>
                        <div
                            style={{
                                ...styles.progressBar,
                                width: total > 0 ? (
                                    i === 0 ? "100%" : i === 1 ? `${(frauds / (total || 1)) * 100}%` : `${percent}%`
                                ) : "0%",
                                background: `linear-gradient(90deg, ${card.accent}, ${card.accent}55)`,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
    },
    card: {
        borderRadius: "18px",
        padding: "24px",
        backdropFilter: "blur(20px)",
        animation: "fadeUp 0.5s ease both",
        position: "relative",
        overflow: "hidden",
    },
    topRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
    },
    icon: {
        fontSize: "20px",
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 400,
    },
    dot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
    },
    value: {
        fontFamily: "var(--font-display)",
        fontSize: "40px",
        fontWeight: 400,
        lineHeight: 1,
        marginBottom: "6px",
        letterSpacing: "-0.02em",
    },
    label: {
        color: "var(--text-secondary)",
        fontSize: "13px",
        fontWeight: 400,
        marginBottom: "4px",
    },
    sub: {
        fontSize: "11px",
        fontWeight: 400,
        letterSpacing: "0.04em",
        marginBottom: "16px",
        textTransform: "uppercase",
    },
    progressTrack: {
        height: "2px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "2px",
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        borderRadius: "2px",
        transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
};

export default Analytics;
