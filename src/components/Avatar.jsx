import React from "react";
import { portfolioData } from "../data/portfolioData";

export default function Avatar() {
    return (
        <div className="avatar-wrapper">
            {/* Soft glow ring */}
            <div className="avatar-glow" />
            {/* Photo */}
            <div className="avatar-ring">
                <img
                    src={portfolioData.avatarUrl}
                    alt={portfolioData.name}
                    className="avatar-img"
                    draggable={false}
                />
            </div>
        </div>
    );
}
