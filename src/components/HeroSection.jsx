import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import ChatInput from "./ChatInput";
import QuickButtons from "./QuickButtons";
import { portfolioData } from "../data/portfolioData";

const ROLES = [
    "Software Developer",
    "CS Student",
    "Frontend Developer",
    "React Enthusiast",
    "Full Stack Developer",
    "UI/UX Lover",
    "Open Source Contributor",
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex % words.length];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayed(current.slice(0, displayed.length + 1));
                if (displayed.length + 1 === current.length) {
                    setTimeout(() => setIsDeleting(true), pauseMs);
                }
            } else {
                setDisplayed(current.slice(0, displayed.length - 1));
                if (displayed.length - 1 === 0) {
                    setIsDeleting(false);
                    setWordIndex((i) => (i + 1) % words.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

    return displayed;
}

export default function HeroSection({ onSend, disabled }) {
    const role = useTypewriter(ROLES);

    return (
        <section className="hero-section">
            {/* Small label + large title */}
            <div className="hero-text fade-in-up" style={{ animationDelay: "0ms" }}>
                <p className="hero-greeting">{portfolioData.greeting}</p>
                <h1 className="hero-tagline-title">
                    <span className="hero-role-wrap">
                        <span className="hero-role">{role}</span>
                        <span className="hero-cursor">|</span>
                    </span>
                </h1>
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
