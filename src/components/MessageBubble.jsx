import React from "react";
import { ExternalLink } from "lucide-react";

// ----------------------------------------------------------------
// MessageBubble — renders both user and assistant messages
// ----------------------------------------------------------------

function ProjectCards({ projects }) {
    return (
        <div className="msg-projects-grid">
            {projects.map((proj, i) => (
                <div key={i} className="msg-project-card" style={{ "--accent": proj.color }}>
                    <div className="msg-project-header">
                        <span className="msg-project-emoji">{proj.emoji}</span>
                        <div>
                            <div className="msg-project-title">{proj.title}</div>
                            <div className="msg-project-date">{proj.date}</div>
                        </div>
                    </div>
                    <p className="msg-project-desc">{proj.description}</p>
                    <div className="msg-tech-tags">
                        {proj.tech.map((t) => (
                            <span key={t} className="msg-tech-tag">{t}</span>
                        ))}
                    </div>
                    <div className="msg-project-links">
                        {proj.github && (
                            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="msg-link-btn ghost">
                                GitHub ↗
                            </a>
                        )}
                        {proj.live && (
                            <a href={proj.live} target="_blank" rel="noopener noreferrer" className="msg-link-btn accent">
                                <ExternalLink size={12} /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function SkillsGrid({ skills }) {
    return (
        <div className="msg-skills-wrap">
            {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="msg-skill-group">
                    <div className="msg-skill-category">{category}</div>
                    <div className="msg-skill-tags">
                        {items.map((s) => (
                            <span key={s} className="msg-skill-tag">{s}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ExperienceList({ experience }) {
    return (
        <div className="msg-exp-list">
            {experience.map((exp, i) => (
                <div key={i} className="msg-exp-item">
                    <div className="msg-exp-header">
                        <span className="msg-exp-emoji">{exp.emoji}</span>
                        <div className="msg-exp-meta">
                            <div className="msg-exp-role">{exp.role}</div>
                            <div className="msg-exp-company">{exp.company} · {exp.period}</div>
                        </div>
                    </div>
                    <ul className="msg-exp-points">
                        {exp.points.map((pt, j) => (
                            <li key={j}>{pt}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function ContactCard({ contact }) {
    return (
        <div className="msg-contact-card">
            <a href={`mailto:${contact.email}`} className="msg-contact-link">
                {contact.email}
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="msg-contact-link">
                GitHub — {contact.github.replace("https://", "")}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="msg-contact-link">
                LinkedIn — {contact.linkedin.replace("https://", "")}
            </a>
            <span className="msg-contact-link" style={{ cursor: "default" }}>
                {contact.location}
            </span>
        </div>
    );
}

function EducationCard({ education }) {
    return (
        <div className="msg-edu-card">
            {education.map((edu, i) => (
                <div key={i}>
                    <div className="msg-edu-school">{edu.school}</div>
                    <div className="msg-edu-degree">{edu.degree}</div>
                    <div className="msg-edu-gpa">{edu.gpa} · {edu.period}</div>
                    <div className="msg-edu-courses">
                        {edu.courses.map((c) => (
                            <span key={c} className="msg-edu-course">{c}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ----------------------------------------------------------------
// Rich text renderer — supports **bold** and newlines
// ----------------------------------------------------------------
function RichText({ text }) {
    return (
        <span>
            {text.split("\n").map((line, i) => (
                <span key={i}>
                    {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                            ? <strong key={j}>{part.slice(2, -2)}</strong>
                            : part
                    )}
                    {i < text.split("\n").length - 1 && <br />}
                </span>
            ))}
        </span>
    );
}

// ----------------------------------------------------------------
// Main component
// ----------------------------------------------------------------
export default function MessageBubble({ message }) {
    const { role, response, text } = message;
    const isUser = role === "user";

    if (isUser) {
        return (
            <div className="msg-row user">
                <div className="bubble user-bubble">{text}</div>
            </div>
        );
    }

    // Assistant message
    const r = response;
    return (
        <div className="msg-row assistant">
            <div className="bubble assistant-bubble">
                {r.heading && (
                    <div className="msg-heading">
                        {r.heading}
                    </div>
                )}

                {r.type === "text" && (
                    <p className="msg-text">
                        <RichText text={r.content} />
                    </p>
                )}

                {r.type === "projects" && <ProjectCards projects={r.content} />}
                {r.type === "skills" && <SkillsGrid skills={r.content} />}
                {r.type === "experience" && <ExperienceList experience={r.content} />}
                {r.type === "contact" && <ContactCard contact={r.content} />}
                {r.type === "education" && <EducationCard education={r.content} />}

                {r.link && (
                    <a
                        href={r.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="msg-link-btn accent inline-mt"
                    >
                        {r.link.label}
                    </a>
                )}
            </div>
        </div>
    );
}
