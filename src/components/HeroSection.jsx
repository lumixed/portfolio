import React from "react";
import Avatar from "./Avatar";
import ChatInput from "./ChatInput";
import QuickButtons from "./QuickButtons";
import { portfolioData } from "../data/portfolioData";

export default function HeroSection({ onSend, disabled }) {
    return (
        <section className="hero-section">
            {/* Name + Title */}
            <div className="hero-text fade-in-up" style={{ animationDelay: "0ms" }}>
                <h1 className="hero-greeting">{portfolioData.greeting}</h1>
                <p className="hero-tagline">{portfolioData.tagline}</p>
            </div>

            {/* Avatar */}
            <div className="hero-avatar fade-in-up" style={{ animationDelay: "120ms" }}>
                <Avatar />
            </div>

            {/* Chat input */}
            <div className="hero-input-wrap fade-in-up" style={{ animationDelay: "240ms" }}>
                <ChatInput onSend={onSend} disabled={disabled} />
                <QuickButtons onSelect={onSend} />
            </div>
        </section>
    );
}
