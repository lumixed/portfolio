// ============================================================
//  aiResponseHandler.js — Rule-based chatbot response logic
//  Swap the body of `getAIResponse` to plug in OpenAI API
// ============================================================

import { portfolioData as p } from "../data/portfolioData";

// Response types consumed by MessageBubble:
//  "text"       — plain paragraph
//  "projects"   — project cards
//  "skills"     — skill category grid
//  "experience" — experience list
//  "contact"    — contact + social links
//  "education"  — education card

const normalize = (str) => str.toLowerCase().trim();

// Keyword map: each entry has keywords[] and a resolver() function
const RULES = [
    {
        keywords: ["who are you", "about you", "about", "bio", "yourself", "tell me", "introduce", "who is", "background"],
        resolve: () => ({
            type: "text",
            heading: `About ${p.shortName}`,
            content: p.bio,
            emoji: "🧑‍💻",
        }),
    },
    {
        keywords: ["project", "built", "made", "work", "portfolio", "app", "side project", "show me"],
        resolve: () => ({
            type: "projects",
            heading: "Projects",
            content: p.projects,
            emoji: "🚀",
        }),
    },
    {
        keywords: ["skill", "tech", "stack", "language", "framework", "tool", "know", "use", "competenc"],
        resolve: () => ({
            type: "skills",
            heading: "Technical Skills",
            content: p.skills,
            emoji: "⚡",
        }),
    },
    {
        keywords: ["experience", "job", "work", "employ", "career", "company", "position", "role", "intern"],
        resolve: () => ({
            type: "experience",
            heading: "Work Experience",
            content: p.experience,
            emoji: "💼",
        }),
    },
    {
        keywords: ["contact", "email", "reach", "hire", "available", "connect", "dm", "message", "linkedin"],
        resolve: () => ({
            type: "contact",
            heading: "Get in Touch",
            content: p.contact,
            emoji: "📬",
        }),
    },
    {
        keywords: ["resume", "cv", "curriculum"],
        resolve: () => ({
            type: "text",
            heading: "Resume",
            content: `You can view or download my resume here:`,
            emoji: "📄",
            link: { label: "Open Resume →", url: p.resumeUrl },
        }),
    },
    {
        keywords: ["education", "university", "school", "degree", "ubc", "study", "student", "gpa", "course"],
        resolve: () => ({
            type: "education",
            heading: "Education",
            content: p.education,
            emoji: "🎓",
        }),
    },
    {
        keywords: ["accomplishment", "achievement", "award", "honor", "olympiad", "scholarship", "recognition"],
        resolve: () => ({
            type: "text",
            heading: "Accomplishments",
            content: p.accomplishments.join("\n\n"),
            emoji: "🏆",
        }),
    },
    {
        keywords: ["hi", "hello", "hey", "sup", "howdy", "yo", "greet"],
        resolve: () => ({
            type: "text",
            heading: null,
            content: `Hey there! I'm ${p.shortName}'s AI assistant. Ask me anything about him — his projects, skills, experience, or how to get in touch. 😊`,
            emoji: "👋",
        }),
    },
];

const FALLBACK = {
    type: "text",
    heading: null,
    content: `Hmm, not sure about that one! Try asking me about:\n\n• **Projects** — what I've built\n• **Skills** — my tech stack\n• **Experience** — where I've worked\n• **Contact** — how to reach me\n• **Resume** — download my CV`,
    emoji: "🤔",
};

// ---------------------------------------------------------------
//  Main export — async so you can swap in fetch() for OpenAI API
// ---------------------------------------------------------------
export async function getAIResponse(query) {
    const q = normalize(query);

    for (const rule of RULES) {
        if (rule.keywords.some((kw) => q.includes(normalize(kw)))) {
            return rule.resolve();
        }
    }

    return FALLBACK;
}
