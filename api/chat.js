// api/chat.js
// Vercel Serverless Function — keeps the Gemini API key on the server side.
// The browser calls  POST /api/chat  with { query, history, systemPrompt }
// and this function forwards the request to Gemini using the secret key.

const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res
            .status(500)
            .json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const { query, history = [], systemPrompt } = req.body;

    if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Missing or invalid 'query' field." });
    }

    // Build Gemini contents from history + current query
    const recentHistory = history.slice(-20);
    const contents = recentHistory
        .filter(
            (msg) =>
                msg.role === "user" ||
                (msg.role === "assistant" && msg.response?.type === "text")
        )
        .map((msg) => {
            if (msg.role === "user") {
                return { role: "user", parts: [{ text: msg.text }] };
            } else {
                return { role: "model", parts: [{ text: msg.response?.content || "" }] };
            }
        });

    contents.push({ role: "user", parts: [{ text: query }] });

    const body = {
        system_instruction: systemPrompt
            ? { parts: [{ text: systemPrompt }] }
            : undefined,
        contents,
        generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 512,
        },
    };

    try {
        const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!geminiRes.ok) {
            const errData = await geminiRes.json().catch(() => ({}));
            const message = errData?.error?.message || `HTTP ${geminiRes.status}`;
            return res.status(geminiRes.status).json({ error: message });
        }

        const data = await geminiRes.json();
        const text =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I couldn't generate a response. Please try again.";

        return res.status(200).json({ text });
    } catch (err) {
        console.error("Gemini proxy error:", err.message);
        return res.status(500).json({ error: err.message });
    }
}
