import React from "react";

export default function TypingIndicator() {
    return (
        <div className="typing-bubble">
            <span className="typing-dot" style={{ animationDelay: "0ms" }} />
            <span className="typing-dot" style={{ animationDelay: "160ms" }} />
            <span className="typing-dot" style={{ animationDelay: "320ms" }} />
        </div>
    );
}
