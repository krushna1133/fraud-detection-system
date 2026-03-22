import MessageFraud from "../components/MessageFraud";
import { useNavigate } from "react-router-dom";

function MessagePage() {
    const navigate = useNavigate();

    return (
        <div style={styles.root}>
            {/* Background orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            <div style={styles.inner}>
                {/* Header */}
                <header style={styles.header}>
                    <button onClick={() => navigate("/")} style={styles.backBtn}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                            e.currentTarget.style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                            e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                    >
                        ← Back
                    </button>

                    <div style={styles.headerCenter}>
                        <div style={styles.headerBadge}>
                            <span style={styles.pulseDot} />
                            NLP Analysis Engine
                        </div>
                        <h1 style={styles.pageTitle}>Message Fraud Detection</h1>
                        <p style={styles.pageSub}>Powered by deep language understanding</p>
                    </div>

                    <div style={{ minWidth: "100px" }} />
                </header>

                {/* Content */}
                <div style={styles.contentWrap}>
                    {/* Left — Info panel */}
                    <div style={styles.infoPanel}>
                        <div style={styles.infoPanelInner}>
                            <h3 style={styles.infoTitle}>How it works</h3>

                            {[
                                { icon: "◈", title: "Text Analysis", desc: "Our NLP model scans for urgency cues, suspicious links, and manipulation tactics." },
                                { icon: "◎", title: "Pattern Matching", desc: "Trained on thousands of real phishing and scam messages." },
                                { icon: "⬡", title: "Risk Scoring", desc: "Returns a 0–10 score. Above 7 indicates high fraud probability." },
                            ].map((item, i) => (
                                <div key={i} style={{ ...styles.infoItem, animationDelay: `${i * 0.1 + 0.2}s` }}>
                                    <span style={styles.infoIcon}>{item.icon}</span>
                                    <div>
                                        <p style={styles.infoItemTitle}>{item.title}</p>
                                        <p style={styles.infoItemDesc}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Risk legend */}
                            <div style={styles.legend}>
                                <p style={styles.legendTitle}>Risk Scale</p>
                                {[
                                    { range: "0 – 3", label: "Low Risk", color: "#3ecf8e" },
                                    { range: "4 – 6", label: "Medium Risk", color: "#c9a84c" },
                                    { range: "7 – 10", label: "High Risk", color: "#e05252" },
                                ].map((r, i) => (
                                    <div key={i} style={styles.legendRow}>
                                        <div style={{ ...styles.legendDot, background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                                        <span style={{ ...styles.legendRange, color: r.color }}>{r.range}</span>
                                        <span style={styles.legendLabel}>{r.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Main component */}
                    <div style={styles.mainCard}>
                        <MessageFraud />
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
        right: "-100px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,144,217,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
    },
    orb2: {
        position: "fixed",
        bottom: "-200px",
        left: "-100px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(62,207,142,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
    },
    inner: {
        position: "relative",
        zIndex: 1,
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 24px 48px",
    },
    header: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "40px",
        animation: "fadeUp 0.5s ease both",
    },
    backBtn: {
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
        color: "#4a90d9",
        background: "rgba(74,144,217,0.08)",
        border: "1px solid rgba(74,144,217,0.2)",
        padding: "4px 14px",
        borderRadius: "100px",
    },
    pulseDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#3ecf8e",
        boxShadow: "0 0 8px #3ecf8e",
        display: "inline-block",
    },
    pageTitle: {
        fontFamily: "var(--font-display)",
        fontSize: "clamp(24px, 3.5vw, 36px)",
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
    },
    pageSub: {
        fontSize: "13px",
        color: "var(--text-muted)",
        fontWeight: 300,
    },
    contentWrap: {
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "24px",
        alignItems: "start",
    },
    infoPanel: {
        animation: "fadeUp 0.5s ease 0.15s both",
    },
    infoPanelInner: {
        background: "linear-gradient(145deg, rgba(17,30,53,0.8) 0%, rgba(13,21,38,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    infoTitle: {
        fontFamily: "var(--font-display)",
        fontSize: "18px",
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        paddingBottom: "16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    infoItem: {
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
        animation: "fadeUp 0.4s ease both",
    },
    infoIcon: {
        fontSize: "16px",
        color: "var(--gold)",
        opacity: 0.7,
        marginTop: "2px",
        flexShrink: 0,
    },
    infoItemTitle: {
        fontSize: "13px",
        fontWeight: 600,
        color: "var(--text-primary)",
        marginBottom: "4px",
        letterSpacing: "0.02em",
    },
    infoItemDesc: {
        fontSize: "12px",
        color: "var(--text-muted)",
        lineHeight: 1.6,
        fontWeight: 300,
    },
    legend: {
        background: "rgba(255,255,255,0.025)",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    legendTitle: {
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: "4px",
    },
    legendRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    legendDot: {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        flexShrink: 0,
    },
    legendRange: {
        fontSize: "13px",
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        width: "50px",
        flexShrink: 0,
    },
    legendLabel: {
        fontSize: "12px",
        color: "var(--text-secondary)",
        fontWeight: 300,
    },
    mainCard: {
        background: "linear-gradient(145deg, rgba(17,30,53,0.8) 0%, rgba(13,21,38,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "32px",
        backdropFilter: "blur(20px)",
        animation: "fadeUp 0.5s ease 0.2s both",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    },
};

export default MessagePage;
