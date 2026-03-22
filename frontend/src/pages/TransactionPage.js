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
        <div style={styles.root}>
            {/* Background orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            <div style={styles.inner}>
                {/* Header */}
                <header style={styles.header}>
                    <button onClick={() => navigate("/")} style={styles.backBtn}>
                        <span>←</span>
                        <span>Back</span>
                    </button>

                    <div style={styles.headerCenter}>
                        <div style={styles.headerBadge}>
                            <span style={styles.headerBadgeDot} />
                            Live Analysis
                        </div>
                        <h1 style={styles.pageTitle}>Transaction Fraud Detection</h1>
                    </div>

                    <div style={styles.headerRight}>
                        <span style={styles.secBadge}>🔒 Secured</span>
                    </div>
                </header>

                {/* Analytics */}
                <section style={{ ...styles.section, animationDelay: "0.1s" }}>
                    <Analytics transactions={transactions} />
                </section>

                {/* Main Grid */}
                <div style={styles.grid}>
                    {/* Form */}
                    <div style={{ ...styles.card, animationDelay: "0.2s" }}>
                        <TransactionForm onAdd={handleAdd} />
                    </div>

                    {/* Table */}
                    <div style={{ ...styles.card, ...styles.cardWide, animationDelay: "0.25s" }}>
                        <TransactionList transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    root: {
        minHeight: "100vh",
        background: "var(--obsidian)",
        position: "relative",
        overflow: "hidden",
    },
    orb1: {
        position: "fixed",
        top: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,144,217,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
    },
    orb2: {
        position: "fixed",
        bottom: "-200px",
        left: "-200px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
    },
    inner: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "32px 24px 48px",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "36px",
        animation: "fadeUp 0.5s ease both",
    },
    backBtn: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "var(--text-secondary)",
        padding: "10px 18px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "var(--font-body)",
        transition: "all 0.2s",
        minWidth: "100px",
    },
    headerCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
    },
    headerBadge: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--gold)",
        background: "rgba(201,168,76,0.08)",
        border: "1px solid rgba(201,168,76,0.2)",
        padding: "4px 14px",
        borderRadius: "100px",
    },
    headerBadgeDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#3ecf8e",
        boxShadow: "0 0 8px #3ecf8e",
        display: "inline-block",
    },
    pageTitle: {
        fontFamily: "var(--font-display)",
        fontSize: "clamp(22px, 3vw, 32px)",
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
    },
    headerRight: {
        minWidth: "100px",
        display: "flex",
        justifyContent: "flex-end",
    },
    secBadge: {
        fontSize: "12px",
        color: "var(--text-muted)",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "6px 12px",
        borderRadius: "100px",
    },
    section: {
        marginBottom: "24px",
        animation: "fadeUp 0.5s ease both",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "20px",
        alignItems: "start",
    },
    card: {
        background: "linear-gradient(145deg, rgba(17,30,53,0.8) 0%, rgba(13,21,38,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "28px",
        backdropFilter: "blur(20px)",
        animation: "fadeUp 0.5s ease both",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    },
    cardWide: {},
};

export default TransactionPage;
