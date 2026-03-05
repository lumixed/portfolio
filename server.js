// server.js — local dev server for /api functions
// Run with: node server.js
// Then start React with: npm start
// The React proxy in package.json will forward /api calls here.

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Dynamically load the API handler
app.post("/api/chat", async (req, res) => {
    const handler = (await import("./api/chat.js")).default;
    return handler(req, res);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n✅ Local API server running at http://localhost:${PORT}`);
    console.log(`   API key loaded: ${process.env.GEMINI_API_KEY ? "YES ✓" : "NO ✗ — add it to .env"}\n`);
});
