import MessageFraud from "../components/MessageFraud";
import { useNavigate } from "react-router-dom";

function MessagePage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/")}>⬅ Back</button>

            <MessageFraud />
        </div>
    );
}

export default MessagePage;