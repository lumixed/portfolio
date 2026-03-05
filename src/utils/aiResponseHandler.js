// ============================================================
//  aiResponseHandler.js
//
//  Architecture:
//  1. Rule-based keywords → rich structured responses (cards)
//  2. Everything else    → /api/chat (Vercel serverless proxy)
//
//  The Gemini API key lives only on the server — never in the
//  browser bundle. Set GEMINI_API_KEY in Vercel environment vars.
// ============================================================

import { portfolioData as p } from "../data/portfolioData";

// -----------------------------------------------------------
//  Build the system prompt that gives Gemini full context
// -----------------------------------------------------------
function buildSystemPrompt() {
    const skills = Object.entries(p.skills)
        .map(([cat, items]) => `${cat}: ${items.join(", ")}`)
        .join("\n");

    const projects = p.projects
        .map((proj) =>
            `- ${proj.title} (${proj.date}): ${proj.description}. Stack: ${proj.tech.join(", ")}. ` +
            `GitHub: ${proj.github}${proj.live ? `. Live: ${proj.live}` : ""}`
        )
        .join("\n");

    const experience = p.experience
        .map((exp) =>
            `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.points.join(". ")}`
        )
        .join("\n");

    const education = p.education
        .map((edu) =>
            `- ${edu.degree} at ${edu.school} (${edu.period}), ${edu.gpa}`
        )
        .join("\n");

    return `You are ${p.shortName} (Jefferson Abraham Dermawan), a software engineer and student at UBC. \
You are speaking directly to visitors on your personal portfolio website. \
You MUST speak in the FIRST PERSON (using "I", "me", "my"). \
Answer questions naturally and conversationally, as if you are talking to a recruiter or a peer. Keep responses short (2-4 sentences max) unless detail is needed.

Here is everything you know about yourself:

NAME: ${p.name}
TITLE: ${p.title}
BIO: ${p.bio}

SKILLS:
${skills}

PROJECTS:
${projects}

EXPERIENCE:
${experience}

EDUCATION:
${education}

ACCOMPLISHMENTS:
${p.accomplishments.join("\n")}

CONTACT:
Email: ${p.contact.email}
GitHub: ${p.contact.github}
LinkedIn: ${p.contact.linkedin}
Location: ${p.contact.location}

RESUME: ${p.resumeUrl}

PERSONALITY / PERSONAL TOUCHES (answer these naturally if asked):
- Favorite music: lo-fi hip-hop, ambient electronic, and occasionally jazz — great for late-night coding sessions.
- Favorite food: Indonesian food, especially nasi goreng and rendang (I miss home cooking!).
- Hobbies outside coding: competitive gaming, reading about algorithms & math, and exploring Vancouver.
- Fun fact: I competed in the Indonesian National Olympiad in Informatics at 17.
- Favorite language: C++ for competitive programming, Python for everything else.
- Favorite project: AwardScope — "it actually helps real students find money for school."
- Philosophy: "Build things that solve real problems, not just things that look cool."

Always be warm, professional, and concise. \
If something isn't covered above, make a reasonable guess based on your profile. \
Never say you don't know — always give a thoughtful answer.`;
}

// -----------------------------------------------------------
//  Secure AI call — proxied through Vercel serverless function
//  The API key never leaves the server.
// -----------------------------------------------------------
async function callGemini(query, history) {
    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query,
                history,
                systemPrompt: buildSystemPrompt(),
            }),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const message = errData?.error || `HTTP ${res.status}`;
            throw new Error(message);
        }

        const data = await res.json();
        return { type: "text", heading: null, content: data.text };
    } catch (err) {
        console.error("AI proxy error:", err.message);
        return {
            type: "text",
            heading: null,
            content: `Something went wrong: ${err.message}. Please try again.`,
        };
    }
}

// -----------------------------------------------------------
//  Rule-based handlers — still used for rich card responses
// -----------------------------------------------------------
const RULES = [
    {
        keywords: ["project", "built", "made", "portfolio", "app", "awardscope", "travelio"],
        resolve: () => ({
            type: "projects",
            heading: "Projects",
            content: p.projects,
        }),
    },
    {
        keywords: ["skill", "tech", "stack", "language", "framework", "tool"],
        resolve: () => ({
            type: "skills",
            heading: "Technical Skills",
            content: p.skills,
        }),
    },
    {
        keywords: ["experience", "job", "employ", "career", "company", "position", "intern"],
        resolve: () => ({
            type: "experience",
            heading: "Work Experience",
            content: p.experience,
        }),
    },
    {
        keywords: ["contact", "email", "reach", "hire", "available", "connect", "linkedin"],
        resolve: () => ({
            type: "contact",
            heading: "Get in Touch",
            content: p.contact,
        }),
    },
    {
        keywords: ["education", "university", "school", "degree", "ubc", "study", "gpa", "course"],
        resolve: () => ({
            type: "education",
            heading: "Education",
            content: p.education,
        }),
    },
];

const normalize = (str) => str.toLowerCase().trim();

// -----------------------------------------------------------
//  Main export — async, accepts conversation history
// -----------------------------------------------------------
export async function getAIResponse(query, history = []) {
    const q = normalize(query);

    // Check for rule-based card responses first
    for (const rule of RULES) {
        if (rule.keywords.some((kw) => q.includes(normalize(kw)))) {
            return rule.resolve();
        }
    }

    // Everything else → Gemini real AI
    return callGemini(query, history);
}
