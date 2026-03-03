import React, { useState, useCallback } from "react";
import HeroSection from "./components/HeroSection";
import ChatWindow from "./components/ChatWindow";
import { getAIResponse } from "./utils/aiResponseHandler";

export default function App() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = useCallback(async (query) => {
        if (!query.trim() || isTyping) return;

        // Append the user message immediately
        const userMessage = { role: "user", text: query };
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        // Simulate a short thinking delay (300–600ms)
        const delay = 350 + Math.random() * 300;
        await new Promise((r) => setTimeout(r, delay));

        const response = await getAIResponse(query);
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "assistant", response }]);
    }, [isTyping]);

    return (
        <div className="app-root">
            {/* Ambient background blobs */}
            <div className="bg-blob blob-1" />
            <div className="bg-blob blob-2" />
            <div className="bg-blob blob-3" />

            {/* Grid overlay */}
            <div className="bg-grid" />

            {/* Content */}
            <main className="app-main">
                <HeroSection onSend={handleSend} disabled={isTyping} />
                <ChatWindow messages={messages} isTyping={isTyping} />
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <span>© 2026 Jefferson Abraham Dermawan</span>
            </footer>
        </div>
    );
}