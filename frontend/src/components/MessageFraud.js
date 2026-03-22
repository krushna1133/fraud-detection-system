import { useState } from "react";

function MessageFraud() {
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleCheck = async () => {
        if (!message.trim()) {
            alert("Please enter a message");
            return;
        }
        setLoading(true);
        setScore(null);
        try {
            const res = await fetch(
                "http://localhost:8080/api/transactions/predict",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),
                }
            );
            const data = await res.json();
            setScore(data.fraudScore);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getRisk = (s) => {
        if (s > 7) return { label: "High Risk", color: "#e05252", bg: "rgba(224,82,82,0.08)", border: "rgba(224,82,82,0.25)", icon: "⚠" };
        if (s > 4) return { label: "Medium Risk", color: "#c9a84c", bg: "rgba(201,168,76,0.08)", border: "rgba(201,168,76,0.25)", icon: "◎" };
        return { label: "Low Risk", color: "#3ecf8e", bg: "rgba(62,207,142,0.08)", border: "rgba(62,207,142,0.25)", icon: "✓" };
    };

    const risk = score !== null ? getRisk(score) : null;

    return (
        <div style={styles.wrapper}>
            {/* Input section */}
            <div style={styles.inputSection}>
                <div style={styles.sectionHeader}>
                    <div style={styles.sectionIcon}>💬</div>
                    <div>
                        <h3 style={styles.sectionTitle}>Paste Message</h3>
                        <p style={styles.sectionSub}>Enter any suspicious text to analyse</p>
                    </div>
                </div>

                <div
                    style={{
                        ...styles.textareaWrap,
                        border: focused
                            ? "1px solid rgba(201,168,76,0.4)"
                            : "1px solid rgba(255,255,255,0.07)",
                        boxShadow: focused ? "0 0 0 4px rgba(201,168,76,0.06)" : "none",
                    }}
                >
                    <textarea
                        style={styles.textarea}
                        rows="6"
                        placeholder="e.g. Congratulations! You've won ₹50,000. Click here to claim your prize immediately..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />
                    <div style={styles.charCount}>
                        {message.length} characters
                    </div>
                </div>

                <button
                    onClick={handleCheck}
                    disabled={loading || !message.trim()}
                    style={{
                        ...styles.btn,
                        opacity: loading || !message.trim() ? 0.6 : 1,
                        cursor: loading || !message.trim() ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={e => { if (!loading && message.trim()) e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                >
                    {loading ? (
                        <>
                            <span style={styles.spinner} />
                            Analysing message...
                        </>
                    ) : (
                        <>
                            <span>Run Fraud Analysis</span>
                            <span style={styles.btnArrow}>→</span>
                        </>
                    )}
                </button>

                {/* Example prompts */}
                <div style={styles.exampleSection}>
                    <p style={styles.exampleLabel}>Try an example:</p>
                    <div style={styles.examples}>
                        {[
                            "Your account has been compromised. Verify now.",
                            "Hi, your package is ready for delivery.",
                            "URGENT: Click to claim your reward of ₹1,00,000",
                        ].map((ex, i) => (
                            <button
                                key={i}
                                onClick={() => setMessage(ex)}
                                style={styles.exampleBtn}
                                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")}
                                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                            >
                                {ex.length > 42 ? ex.slice(0, 42) + "..." : ex}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Result */}
            {score !== null && (
                <div
                    style={{
                        ...styles.resultCard,
                        background: risk.bg,
                        border: `1px solid ${risk.border}`,
                        animation: "fadeUp 0.5s ease both",
                    }}
                >
                    {/* Score meter */}
                    <div style={styles.meterSection}>
                        <div style={styles.meterLabel}>
                            <span style={styles.meterTitle}>Fraud Score</span>
                            <span style={{ ...styles.meterValue, color: risk.color }}>
                                {score}<span style={{ fontSize: "18px", opacity: 0.5 }}>/10</span>
                            </span>
                        </div>
                        <div style={styles.meterTrack}>
                            <div
                                style={{
                                    ...styles.meterFill,
                                    width: `${score * 10}%`,
                                    background: `linear-gradient(90deg, ${risk.color}, ${risk.color}88)`,
                                }}
                            />
                            {[2, 4, 6, 8].map(v => (
                                <div
                                    key={v}
                                    style={{
                                        ...styles.meterTick,
                                        left: `${v * 10}%`,
                                    }}
                                />
                            ))}
                        </div>
                        <div style={styles.meterScale}>
                            <span>Safe</span>
                            <span>Suspicious</span>
                            <span>High Risk</span>
                        </div>
                    </div>

                    {/* Verdict */}
                    <div style={styles.verdict}>
                        <div style={{ ...styles.verdictIcon, background: `${risk.color}18`, border: `1px solid ${risk.color}30` }}>
                            <span style={{ color: risk.color, fontSize: "22px" }}>{risk.icon}</span>
                        </div>
                        <div>
                            <p style={{ ...styles.verdictLabel, color: risk.color }}>{risk.label}</p>
                            <p style={styles.verdictDesc}>
                                {score > 7
                                    ? "This message exhibits strong indicators of fraud or phishing. Do not engage."
                                    : score > 4
                                    ? "This message shows some suspicious patterns. Proceed with caution."
                                    : "This message appears to be legitimate with low fraud indicators."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    inputSection: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    sectionHeader: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        paddingBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    sectionIcon: {
        fontSize: "28px",
        width: "52px",
        height: "52px",
        background: "rgba(74,144,217,0.1)",
        border: "1px solid rgba(74,144,217,0.2)",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    sectionTitle: {
        fontFamily: "var(--font-display)",
        fontSize: "22px",
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        marginBottom: "2px",
    },
    sectionSub: {
        fontSize: "13px",
        color: "var(--text-muted)",
        fontWeight: 300,
    },
    textareaWrap: {
        background: "rgba(255,255,255,0.025)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.2s ease",
    },
    textarea: {
        width: "100%",
        background: "transparent",
        border: "none",
        outline: "none",
        padding: "16px 18px 8px",
        color: "var(--text-primary)",
        fontSize: "15px",
        fontFamily: "var(--font-body)",
        fontWeight: 300,
        lineHeight: 1.65,
        resize: "vertical",
        minHeight: "130px",
        display: "block",
    },
    charCount: {
        padding: "6px 18px 10px",
        fontSize: "11px",
        color: "var(--text-muted)",
        textAlign: "right",
        letterSpacing: "0.04em",
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "linear-gradient(135deg, #4a90d9 0%, #2a6cb0 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        padding: "15px 24px",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "var(--font-body)",
        letterSpacing: "0.03em",
        transition: "all 0.2s ease",
        cursor: "pointer",
    },
    btnArrow: {
        fontSize: "18px",
        fontWeight: 300,
    },
    spinner: {
        width: "15px",
        height: "15px",
        border: "2px solid rgba(255,255,255,0.25)",
        borderTop: "2px solid #fff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        display: "inline-block",
        flexShrink: 0,
    },
    exampleSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    exampleLabel: {
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
    },
    examples: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    exampleBtn: {
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "8px",
        padding: "10px 14px",
        color: "var(--text-secondary)",
        fontSize: "13px",
        fontFamily: "var(--font-body)",
        textAlign: "left",
        cursor: "pointer",
        transition: "border-color 0.2s",
        fontWeight: 300,
        lineHeight: 1.4,
    },
    resultCard: {
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    meterSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    meterLabel: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    meterTitle: {
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
    },
    meterValue: {
        fontFamily: "var(--font-display)",
        fontSize: "36px",
        fontWeight: 400,
        lineHeight: 1,
    },
    meterTrack: {
        height: "6px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "6px",
        overflow: "hidden",
        position: "relative",
    },
    meterFill: {
        height: "100%",
        borderRadius: "6px",
        transition: "width 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
    meterTick: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "1px",
        background: "rgba(0,0,0,0.3)",
    },
    meterScale: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.04em",
    },
    verdict: {
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        paddingTop: "16px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    verdictIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    verdictLabel: {
        fontWeight: 600,
        fontSize: "16px",
        marginBottom: "4px",
        letterSpacing: "0.02em",
    },
    verdictDesc: {
        color: "var(--text-secondary)",
        fontSize: "14px",
        lineHeight: 1.6,
        fontWeight: 300,
    },
};

export default MessageFraud;
