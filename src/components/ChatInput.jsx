import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    // Auto-focus on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSend = () => {
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-input-wrap">
            <input
                ref={inputRef}
                className="chat-input"
                type="text"
                placeholder="Ask me anything…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
                spellCheck={false}
            />
            <button
                className="chat-send-btn"
                onClick={handleSend}
                disabled={!value.trim() || disabled}
                aria-label="Send"
            >
                <Send size={18} />
            </button>
        </div>
    );
}
