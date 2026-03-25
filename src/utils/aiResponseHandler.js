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
        .map((proj) => {
            const event = proj.event ? ` [${proj.event}]` : "";
            const stack = proj.tech?.length ? `Stack: ${proj.tech.join(", ")}.` : "";
            const links = [proj.github && `GitHub: ${proj.github}`, proj.live && `Live: ${proj.live}`]
                .filter(Boolean)
                .join(" · ");
            return `- ${proj.title}${event} (${proj.date}): ${proj.description} ${stack} ${links} Highlights: ${(proj.highlights || []).join(" | ")}`;
        })
        .join("\n");

    const experience = p.experience
        .map((exp) =>
            `- ${exp.role} at ${exp.company} (${exp.period})${exp.type ? ` — ${exp.type}` : ""}: ${exp.points.join(". ")}`
        )
        .join("\n");

    const education = p.education
        .map((edu) => {
            const notes = edu.transcriptNotes?.length ? `\n  Session notes: ${edu.transcriptNotes.join(" ")}` : "";
            const courseBlock = edu.courses?.length ? `\n  Courses (including non-CS breadth): ${edu.courses.join("; ")}` : "";
            return `- ${edu.degree} at ${edu.school} (${edu.period})${edu.yearStanding ? `, ${edu.yearStanding}` : ""}. ${edu.gpa}.${notes}${courseBlock}`;
        })
        .join("\n");

    const per = p.personal || {};
    const cp = per.competitiveProgramming?.summary || "";
    const schol = per.scholarship?.summary || "";
    const photo = per.photography
        ? `${per.photography.instagramHandle} — ${per.photography.instagramUrl}`
        : "";

    const hackWins = (p.hackathonWins || [])
        .map((h) => `${h.name}${h.subtitle ? ` (${h.subtitle})` : ""}: ${h.prize}`)
        .join("\n");

    return `You are ${p.shortName} (${p.name}), a software engineer and Computer Science student at UBC. \
You are speaking directly to visitors on your personal portfolio website. \
You MUST speak in the FIRST PERSON (using "I", "me", "my"). \
Answer questions naturally and conversationally, as if you are talking to a recruiter or a peer. Keep responses short (2-4 sentences max) unless detail is needed.

Here is everything you know about yourself:

NAME: ${p.name}
TITLE: ${p.title}
BIO: ${p.bio}

BACKGROUND & PERSONAL:
- Born: ${per.dateOfBirth || "N/A"} (age ${per.age ?? "N/A"})
- From: ${per.hometown || "Indonesia"} (${per.nationality || "Indonesian"})
- High school: ${per.highSchool || "N/A"}
- Hobbies: ${(per.hobbies || []).join(", ") || "N/A"}
- Photography portfolio Instagram: ${photo || "N/A"}
- Competitive programming: ${cp}
- Scholarship / university choice: ${schol}
- Note on work transition: ${per.whyCanada || ""}

SKILLS:
${skills}

PROJECTS (most from hackathons):
${projects}

HACKATHON PRIZES / RECOGNITION:
${hackWins || "(none listed)"}

EXPERIENCE:
${experience}

EDUCATION:
${education}

ACCOMPLISHMENTS:
${p.accomplishments.join("\n")}

CONTACT:
Email: ${p.contact.email}
Phone: ${p.contact.phone}
GitHub: ${p.contact.github}
LinkedIn: ${p.contact.linkedin}
Location: ${p.contact.location}
Photography: ${p.contact.photographyInstagram || ""}

RESUME: ${p.resumeUrl}

PERSONALITY / TALKING POINTS (use when relevant):
- I still lean on C++ and contest-style thinking for hard problems; Python for most product work.
- I care about shipping useful tools (financial aid matching, safer routes, travel deals, onboarding).
- Indonesian food and home (Bandung) are part of my story; Vancouver is where I study now.

Always be warm, professional, and concise. \
If asked for a GitHub link you do not have above, say you can share it on request. \
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
        keywords: [
            "project",
            "built",
            "made",
            "portfolio",
            "app",
            "awardscope",
            "travelio",
            "hackathon",
            "nw hacks",
            "nwhacks",
            "hack the coast",
            "safe map",
            "polterguide",
            "polter",
            "find my force",
            "rf cop",
            "gemini",
            "produhacks",
        ],
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
        keywords: [
            "experience",
            "job",
            "employ",
            "career",
            "company",
            "position",
            "intern",
            "lintel",
            "teaching assistant",
            "coach",
            "part-time",
        ],
        resolve: () => ({
            type: "experience",
            heading: "Work Experience",
            content: p.experience,
        }),
    },
    {
        keywords: [
            "contact",
            "email",
            "reach",
            "hire",
            "available",
            "connect",
            "linkedin",
            "instagram",
            "photography",
            "shutteredfilm",
        ],
        resolve: () => ({
            type: "contact",
            heading: "Get in Touch",
            content: p.contact,
        }),
    },
    {
        keywords: [
            "education",
            "university",
            "school",
            "degree",
            "ubc",
            "study",
            "gpa",
            "course",
            "grade",
            "transcript",
            "dean",
            "bandung",
            "indonesia",
            "indonesian",
            "scholarship",
            "high school",
            "smak",
            "birthday",
            "how old",
            "age",
        ],
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
