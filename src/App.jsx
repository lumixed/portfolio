import React, { useState, useCallback, useRef } from "react";
import HeroSection from "./components/HeroSection";
import ChatWindow from "./components/ChatWindow";
import { getAIResponse } from "./utils/aiResponseHandler";

export default function App() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    // Use a ref to always access latest messages without stale closure
    const messagesRef = useRef(messages);
    messagesRef.current = messages;

    const handleSend = useCallback(async (query) => {
        if (!query.trim() || isTyping) return;

        const userMessage = { role: "user", text: query };
        const historySnapshot = messagesRef.current;

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        const delay = 350 + Math.random() * 300;
        await new Promise((r) => setTimeout(r, delay));

        const response = await getAIResponse(query, historySnapshot);
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "assistant", response }]);
    }, [isTyping]);

    return (
        <div className="app-root">
            <main className="app-main">
                <HeroSection onSend={handleSend} disabled={isTyping} />
                <ChatWindow messages={messages} isTyping={isTyping} />
            </main>

            <footer className="app-footer">
                © 2026 Jefferson Abraham Dermawan
            </footer>
        </div>
    );
}