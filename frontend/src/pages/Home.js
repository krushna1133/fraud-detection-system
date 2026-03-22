import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function Home() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.4 + 0.1,
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            raf = requestAnimationFrame(draw);
        };
        draw();

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div style={styles.root}>
            <canvas ref={canvasRef} style={styles.canvas} />

            {/* Radial glow */}
            <div style={styles.glow} />

            <div style={styles.container}>
                {/* Eyebrow */}
                <div style={styles.eyebrow}>
                    <span style={styles.eyebrowDot} />
                    <span style={styles.eyebrowText}>AI-Powered Security Intelligence</span>
                </div>

                {/* Headline */}
                <h1 style={styles.headline}>
                    <span style={styles.headlineLine1}>Fraud Detection</span>
                    <span style={styles.headlineLine2}>Command Centre</span>
                </h1>

                <p style={styles.sub}>
                    Real-time transaction monitoring & intelligent message analysis.<br />
                    Built for precision. Designed for trust.
                </p>

                {/* Cards */}
                <div style={styles.grid}>
                    <Card
                        icon="💳"
                        tag="TRANSACTIONS"
                        title="Transaction Fraud"
                        desc="Detect anomalies across amount, location, device behaviour and transaction patterns."
                        badge="ML Powered"
                        onClick={() => navigate("/transaction")}
                        accent="#c9a84c"
                    />
                    <Card
                        icon="💬"
                        tag="MESSAGING"
                        title="Message Fraud"
                        desc="Analyse suspicious messages using deep NLP to score phishing and social engineering attempts."
                        badge="NLP Engine"
                        onClick={() => navigate("/message")}
                        accent="#4a90d9"
                    />
                </div>

                <p style={styles.footer}>
                    Secured with end-to-end encryption &nbsp;·&nbsp; Zero data retention &nbsp;·&nbsp; SOC 2 Compliant
                </p>
            </div>
        </div>
    );
}

function Card({ icon, tag, title, desc, badge, onClick, accent }) {
    const isHovering = useRef(false);
    const cardRef = useRef(null);

    const handleMouseEnter = () => {
        isHovering.current = true;
        if (cardRef.current) {
            cardRef.current.style.transform = "translateY(-6px) scale(1.02)";
            cardRef.current.style.borderColor = `${accent}55`;
            cardRef.current.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${accent}18`;
        }
    };
    const handleMouseLeave = () => {
        isHovering.current = false;
        if (cardRef.current) {
            cardRef.current.style.transform = "translateY(0) scale(1)";
            cardRef.current.style.borderColor = "rgba(255,255,255,0.07)";
            cardRef.current.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
        }
    };

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ ...styles.card, cursor: "pointer", transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
            {/* Top stripe */}
            <div style={{ ...styles.cardStripe, background: `linear-gradient(90deg, ${accent}40, transparent)` }} />

            <div style={styles.cardHeader}>
                <div style={{ ...styles.cardIconWrap, background: `${accent}15`, border: `1px solid ${accent}30` }}>
                    <span style={styles.cardIcon}>{icon}</span>
                </div>
                <span style={{ ...styles.cardTag, color: accent, borderColor: `${accent}35`, background: `${accent}10` }}>
                    {tag}
                </span>
            </div>

            <h2 style={styles.cardTitle}>{title}</h2>
            <p style={styles.cardDesc}>{desc}</p>

            <div style={styles.cardFooter}>
                <span style={{ ...styles.cardBadge, color: accent }}>⬡ {badge}</span>
                <span style={{ ...styles.cardArrow, color: accent }}>→</span>
            </div>
        </div>
    );
}

const styles = {
    root: {
        minHeight: "100vh",
        background: "var(--obsidian)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "40px 20px",
    },
    canvas: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    },
    glow: {
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "700px",
        background: "radial-gradient(ellipse, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
    },
    container: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "900px",
        width: "100%",
        animation: "fadeUp 0.8s ease both",
    },
    eyebrow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "28px",
        padding: "7px 16px",
        background: "rgba(201,168,76,0.08)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: "100px",
    },
    eyebrowDot: {
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: "#3ecf8e",
        boxShadow: "0 0 8px #3ecf8e",
        animation: "pulse-gold 2s infinite",
        display: "inline-block",
    },
    eyebrowText: {
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        color: "var(--gold-light)",
        textTransform: "uppercase",
        fontFamily: "var(--font-body)",
    },
    headline: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        lineHeight: 1.05,
    },
    headlineLine1: {
        fontFamily: "var(--font-display)",
        fontSize: "clamp(44px, 7vw, 76px)",
        fontWeight: 400,
        color: "var(--text-primary)",
        display: "block",
        letterSpacing: "-0.02em",
    },
    headlineLine2: {
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: "clamp(44px, 7vw, 76px)",
        fontWeight: 400,
        background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "block",
        letterSpacing: "-0.02em",
        animation: "shimmer 4s linear infinite",
    },
    sub: {
        color: "var(--text-secondary)",
        fontSize: "16px",
        lineHeight: 1.7,
        textAlign: "center",
        maxWidth: "480px",
        marginBottom: "48px",
        fontWeight: 300,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        width: "100%",
        marginBottom: "40px",
    },
    card: {
        background: "linear-gradient(145deg, rgba(17,30,53,0.9) 0%, rgba(13,21,38,0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    },
    cardStripe: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        borderRadius: "20px 20px 0 0",
    },
    cardHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
    },
    cardIconWrap: {
        width: "52px",
        height: "52px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    cardIcon: {
        fontSize: "24px",
    },
    cardTag: {
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.1em",
        padding: "4px 10px",
        borderRadius: "100px",
        border: "1px solid",
        fontFamily: "var(--font-body)",
    },
    cardTitle: {
        fontFamily: "var(--font-display)",
        fontSize: "26px",
        fontWeight: 400,
        color: "var(--text-primary)",
        marginBottom: "12px",
        letterSpacing: "-0.01em",
    },
    cardDesc: {
        color: "var(--text-secondary)",
        fontSize: "14px",
        lineHeight: 1.65,
        fontWeight: 300,
        marginBottom: "24px",
    },
    cardFooter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    cardBadge: {
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.05em",
    },
    cardArrow: {
        fontSize: "20px",
        fontWeight: 300,
        transition: "transform 0.2s",
    },
    footer: {
        color: "var(--text-muted)",
        fontSize: "12px",
        letterSpacing: "0.04em",
        fontWeight: 400,
    },
};

export default Home;
