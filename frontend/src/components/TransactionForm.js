import { useState } from "react";
import { addTransaction } from "../services/api";

function TransactionForm({ onAdd }) {
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [device, setDevice] = useState("");
    const [loading, setLoading] = useState(false);
    const [focusField, setFocusField] = useState(null);

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const res = await addTransaction({
                amount: Number(amount),
                location,
                device
            });
            onAdd(res);
            setAmount("");
            setLocation("");
            setDevice("");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            key: "amount",
            label: "Transaction Amount",
            placeholder: "0.00",
            value: amount,
            onChange: setAmount,
            icon: "₹",
            type: "number",
        },
        {
            key: "location",
            label: "Origin Location",
            placeholder: "City, Country",
            value: location,
            onChange: setLocation,
            icon: "◎",
            type: "text",
        },
        {
            key: "device",
            label: "Device Identifier",
            placeholder: "Mobile / Desktop / API",
            value: device,
            onChange: setDevice,
            icon: "⬡",
            type: "text",
        },
    ];

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <h2 style={styles.title}>New Transaction</h2>
                <p style={styles.subtitle}>Submit for fraud analysis</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                {fields.map((f) => (
                    <div key={f.key} style={styles.fieldGroup}>
                        <label style={styles.label}>{f.label}</label>
                        <div
                            style={{
                                ...styles.inputWrap,
                                border: focusField === f.key
                                    ? "1px solid rgba(201,168,76,0.5)"
                                    : "1px solid rgba(255,255,255,0.08)",
                                boxShadow: focusField === f.key
                                    ? "0 0 0 3px rgba(201,168,76,0.07), inset 0 1px 0 rgba(255,255,255,0.04)"
                                    : "none",
                            }}
                        >
                            <span style={styles.inputIcon}>{f.icon}</span>
                            <input
                                style={styles.input}
                                type={f.type}
                                placeholder={f.placeholder}
                                value={f.value}
                                onChange={(e) => f.onChange(e.target.value)}
                                onFocus={() => setFocusField(f.key)}
                                onBlur={() => setFocusField(null)}
                                required
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        ...styles.btn,
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.transform = "translateY(-1px)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "none")}
                >
                    {loading ? "Analysing..." : "Analyse Transaction →"}
                </button>
            </form>
        </div>
    );
}

const styles = {
    wrapper: {
        height: "100%",
    },
    header: {
        marginBottom: "28px",
        paddingBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    title: {
        fontFamily: "var(--font-display)",
        fontSize: "24px",
        fontWeight: 400,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em",
        marginBottom: "4px",
    },
    subtitle: {
        fontSize: "13px",
        color: "var(--text-muted)",
        fontWeight: 300,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    fieldGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-secondary)",
    },
    inputWrap: {
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "10px",
        transition: "all 0.2s ease",
        overflow: "hidden",
    },
    inputIcon: {
        padding: "0 14px",
        fontSize: "14px",
        color: "var(--gold)",
        flexShrink: 0,
        opacity: 0.8,
    },
    input: {
        flex: 1,
        background: "transparent",
        border: "none",
        outline: "none",
        padding: "13px 14px 13px 0",
        color: "var(--text-primary)",
        fontSize: "14px",
        fontFamily: "var(--font-body)",
        fontWeight: 400,
    },
    btn: {
        display: "block",
        width: "100%",
        background: "linear-gradient(135deg, #c9a84c 0%, #a8882e 100%)",
        color: "#0d1526",
        border: "none",
        borderRadius: "10px",
        padding: "14px 20px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "15px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        transition: "all 0.2s ease",
        marginTop: "4px",
        boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
        textAlign: "center",
        lineHeight: "1.4",
    },
    btnContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
    },
    spinner: {
        width: "14px",
        height: "14px",
        border: "2px solid rgba(13,21,38,0.3)",
        borderTop: "2px solid #0d1526",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        display: "inline-block",
    },
};

// inject spinner keyframe
const styleEl = document.createElement("style");
styleEl.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
if (!document.head.querySelector("[data-tx-form-style]")) {
    styleEl.setAttribute("data-tx-form-style", "1");
    document.head.appendChild(styleEl);
}

export default TransactionForm;