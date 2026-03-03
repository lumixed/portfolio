import React from "react";
import Avatar from "./Avatar";
import ChatInput from "./ChatInput";
import QuickButtons from "./QuickButtons";
import { portfolioData } from "../data/portfolioData";

export default function HeroSection({ onSend, disabled }) {
    return (
        <section className="hero-section">
            {/* Small label + large title */}
            <div className="hero-text fade-in-up" style={{ animationDelay: "0ms" }}>
                <p className="hero-greeting">{portfolioData.greeting}</p>
                <h1 className="hero-tagline-title">{portfolioData.title}</h1>
            </div>

            {/* Avatar */}
            <div className="hero-avatar fade-in-up" style={{ animationDelay: "100ms" }}>
                <Avatar />
            </div>

            {/* Chat input + quick buttons */}
            <div className="hero-input-wrap fade-in-up" style={{ animationDelay: "200ms" }}>
                <ChatInput onSend={onSend} disabled={disabled} />
                <QuickButtons onSelect={onSend} />
            </div>
        </section>
    );
}
