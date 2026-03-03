// ============================================================
//  aiResponseHandler.js
//
//  Architecture:
//  1. Rule-based keywords → rich structured responses (cards)
//  2. Everything else    → Gemini API (real AI, free tier)
//  3. No API key set     → friendly prompt to add one
//
//  To enable: add REACT_APP_GEMINI_API_KEY to .env and restart
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

    return `You are an AI assistant embedded in ${p.name}'s personal portfolio website. \
You speak as if YOU ARE ${p.shortName}'s assistant — knowledgeable, friendly, and concise. \
Answer questions naturally and conversationally. Keep responses short (2-4 sentences max) unless detail is needed.

Here is everything you know about ${p.shortName}:

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
- Favourite music: lo-fi hip-hop, ambient electronic, and occasionally jazz — great for late-night coding sessions
- Favourite food: Indonesian food, especially nasi goreng and rendang (misses home cooking!)
- Hobbies outside coding: competitive gaming, reading about algorithms & math, exploring Vancouver
- Fun fact: competed in the Indonesian National Olympiad in Informatics at 17
- Favourite language: C++ for competitive programming, Python for everything else
- Favourite project: AwardScope — "it actually helps real students find money for school"
- Philosophy: "Build things that solve real problems, not just things that look cool"

Always be warm, concise, and represent ${p.shortName} professionally. \
If something isn't covered above, make a reasonable friendly guess based on his profile. \
Never say you don't know — always give a thoughtful answer.`;
}

// -----------------------------------------------------------
//  Gemini API call with conversation history
// -----------------------------------------------------------
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

async function callGemini(query, history) {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey || apiKey === "your-gemini-api-key-here") {
        return {
            type: "text",
            heading: null,
            content: `To enable real AI responses, add your free Gemini API key to the \`.env\` file:\n\n**REACT_APP_GEMINI_API_KEY=your-key**\n\nGet a free key at: aistudio.google.com/apikey — then restart \`npm start\`.`,
        };
    }

    // Build conversation history in Gemini format
    // Only include last 10 exchanges to stay within token limits
    const recentHistory = history.slice(-20);
    const contents = recentHistory
        .filter((msg) => msg.role === "user" || (msg.role === "assistant" && msg.response?.type === "text"))
        .map((msg) => {
            if (msg.role === "user") {
                return { role: "user", parts: [{ text: msg.text }] };
            } else {
                const text = msg.response?.content || "";
                return { role: "model", parts: [{ text }] };
            }
        });

    // Add the current query
    contents.push({ role: "user", parts: [{ text: query }] });

    const body = {
        system_instruction: { parts: [{ text: buildSystemPrompt() }] },
        contents,
        generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 512,
        },
    };

    try {
        const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const message = errData?.error?.message || `HTTP ${res.status}`;
            throw new Error(message);
        }

        const data = await res.json();
        const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I couldn't generate a response. Please try again.";

        return { type: "text", heading: null, content: text };
    } catch (err) {
        console.error("Gemini error:", err.message);
        return {
            type: "text",
            heading: null,
            content: `Something went wrong: ${err.message}. Check your API key and network.`,
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
