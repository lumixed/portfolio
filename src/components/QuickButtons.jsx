import React from "react";

const QUICK_BUTTONS = [
    { label: "Me", query: "who are you?" },
    { label: "Projects", query: "show me your projects" },
    { label: "Skills", query: "what skills do you have?" },
    { label: "Experience", query: "what is your experience?" },
    { label: "Contact", query: "how can I contact you?" },
];

export default function QuickButtons({ onSelect }) {
    return (
        <div className="quick-buttons">
            {QUICK_BUTTONS.map((btn) => (
                <button
                    key={btn.label}
                    className="quick-btn"
                    onClick={() => onSelect(btn.query)}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
}
