import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ messages, isTyping }) {
    const bottomRef = useRef(null);

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    if (messages.length === 0 && !isTyping) return null;

    return (
        <div className="chat-window">
            {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
            ))}
            {isTyping && (
                <div className="msg-row assistant">
                    <TypingIndicator />
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}
