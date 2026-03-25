// ============================================================
//  portfolioData.js — Edit ALL your portfolio info here
// ============================================================

export const portfolioData = {
    // ----------------------------------------------------------
    // IDENTITY — change your name, title, and bio here
    // ----------------------------------------------------------
    name: "Jefferson Abraham Dermawan",
    shortName: "Jefferson",
    title: "Software Engineer",
    greeting: "Hi, I'm Jefferson",
    tagline: "I build high-performance systems and elegant solutions.",

    bio: `I'm a second-year Computer Science student at UBC (University of British Columbia), originally from Bandung, Indonesia. I focus on backend engineering and competitive programming—I'm especially strong in C++ and algorithmic problem solving. I work part-time as a Backend Engineer at Lintel AI and I'm a teaching assistant for CPSC 121. Most of my projects come from hackathons.`,

    // Used by the portfolio AI for richer answers (birthday, hobbies, background)
    personal: {
        dateOfBirth: "December 12, 2006",
        age: 19,
        nationality: "Indonesian",
        hometown: "Bandung, West Java, Indonesia",
        highSchool: "SMAK 1 BPK Penabur Bandung",
        hobbies: ["photography", "traveling"],
        photography: {
            instagramHandle: "@shutteredfilm",
            instagramUrl: "https://instagram.com/shutteredfilm",
            note: "Photography portfolio on Instagram",
        },
        competitiveProgramming: {
            summary:
                "Former competitive programmer in Indonesia. Ranked Top 32 nationally in the 2022 Indonesian National Olympiad in Informatics (NOI). Very strong in problem solving and C++.",
        },
        scholarship: {
            summary:
                "Received a full scholarship from the Indonesian government to study abroad. Was accepted to multiple prestigious universities worldwide and chose UBC.",
        },
        whyCanada:
            "Moved to Canada for university; workload increased, so I stepped back from part-time competitive programming teaching in Indonesia.",
    },

    // ----------------------------------------------------------
    // AVATAR — put your photo in /public/ and update the path
    // ----------------------------------------------------------
    avatarUrl: "/profile.jpg",

    // ----------------------------------------------------------
    // CONTACT — update your email, phone, and social links
    // ----------------------------------------------------------
    contact: {
        email: "jeffersonabrahamdermawan@gmail.com",
        phone: "236-983-5367",
        github: "https://github.com/lumixed",
        linkedin: "https://linkedin.com/in/jeffersondermawan",
        location: "Vancouver, BC, Canada",
        photographyInstagram: "https://instagram.com/shutteredfilm",
    },

    // ----------------------------------------------------------
    // RESUME — paste your Google Drive / link here
    // ----------------------------------------------------------
    resumeUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",

    // ----------------------------------------------------------
    // EDUCATION
    // ----------------------------------------------------------
    education: [
        {
            school: "University of British Columbia",
            degree: "Bachelor of Science in Computer Science",
            faculty: "Faculty of Science (Vancouver)",
            period: "Aug 2024 – Present",
            yearStanding: "Second year",
            gpa: "88.9% cumulative GPA · Dean's List",
            transcriptNotes: [
                "2024-25 Winter Session: session average 90.0%; cumulative average 90.0% for that period.",
                "2025-26 Winter Session: session average 87.2% (some courses still in progress / grades pending).",
            ],
            courses: [
                "CPSC 110 — Computation, Programs, and Programming",
                "CPSC 121 — Models of Computation",
                "CPSC 210 — Software Construction",
                "CPSC 213 — Introduction to Computer Systems",
                "CPSC 221 — Basic Algorithms and Data Structures",
                "CPSC 310 — Introduction to Software Engineering",
                "CPSC 313 — Computer Hardware and Operating Systems",
                "MATH 100 / 101 — Calculus",
                "MATH 200 — Calculus III",
                "MATH 221 — Matrix Algebra",
                "STAT 251 — Elementary Statistics",
                "PHYS 131 — Energy and Waves",
                "ASTR 101 — Introduction to the Solar System",
                "BIOL 121 — Genetics, Evolution and Ecology",
                "ECON 101 — Principles of Microeconomics",
                "ECON 102 — Principles of Macroeconomics",
                "CHIN 131 / 133 — Basic Chinese I",
                "SCIE 113 — First-Year Seminar in Science",
            ],
        },
    ],

    // ----------------------------------------------------------
    // ACCOMPLISHMENTS
    // ----------------------------------------------------------
    accomplishments: [
        "Full scholarship from the Indonesian government to study abroad; chose UBC over other prestigious acceptances",
        "Top 32 nationally in the 2022 Indonesian National Olympiad in Informatics (NOI)",
        "Dean's List at UBC",
        "Second place ($6,000) — Find My Force (RF COP system), hackathon",
        "Honorable mention — Best Use of Gemini AI, ProduHacks (PolterGuide)",
    ],

    hackathonWins: [
        {
            name: "Find My Force",
            subtitle: "RF COP System",
            prize: "Second place — $6,000",
        },
        {
            name: "PolterGuide",
            prize: "Honorable mention — Best Use of Gemini AI (ProduHacks)",
        },
    ],

    // ----------------------------------------------------------
    // SKILLS — add/remove technologies freely
    // ----------------------------------------------------------
    skills: {
        Languages: ["Python", "Java", "C/C++", "TypeScript", "JavaScript", "HTML/CSS"],
        Frameworks: ["React", "Node.js", "Express", "Django", "Flask", "FastAPI"],
        Tools: ["Git", "Docker", "Docker Compose", "GCP", "VS Code", "IntelliJ", "Electron", "Vite", "Firebase", "MongoDB"],
        Libraries: ["NumPy", "React Router", "Gemini API", "Framer Motion", "Leaflet", "WebSockets", "PyPDF", "uAgents (Fetch.ai)"],
    },

    // ----------------------------------------------------------
    // PROJECTS — add as many objects as you want
    // ----------------------------------------------------------
    projects: [
        {
            title: "Travelio",
            date: "January 2026",
            event: "nwHacks",
            description:
                "Flight deal discovery app: cheapest flights from your city vs typical monthly prices, plus AI-generated itineraries. Finds deals, compares savings vs average fares, and uses Gemini for personalized trip plans.",
            tech: ["React", "Vite", "CSS", "Node.js", "Express", "Python", "Amadeus Travel API", "Gemini API"],
            highlights: [
                "Flight discovery ranked by deal quality relative to average monthly pricing",
                "Deal comparison vs typical pricing",
                "AI itineraries via Gemini for any destination",
            ],
            github: "https://github.com/lumixed/Travelio",
            live: "",
            emoji: "",
            color: "#a78bfa",
        },
        {
            title: "AwardScope",
            date: "February 2026",
            event: "Hack the Coast",
            description:
                "Technical financial aid platform: matches students with scholarships and bursaries using matching logic and generative AI (eligibility, scoring, essay support). Monochrome, data-dense UI with Framer Motion.",
            tech: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Node.js", "Express", "MongoDB", "Gemini API", "Docker", "Docker Compose"],
            highlights: [
                "Precision matching engine with real-time eligibility and probabilistic scoring",
                "AI-assisted essay blueprints grounded in profile and award criteria",
                "Dockerized stack; typical local ports frontend :8080, API :3001",
            ],
            github: "https://github.com/lumixed/awardscope",
            live: "https://awardscope.vercel.app",
            emoji: "",
            color: "#38bdf8",
        },
        {
            title: "Find My Force",
            date: "Hackathon project",
            event: "RF COP System",
            description:
                "RF COP system project; team placed second and won $6,000.",
            tech: [],
            highlights: ["Second place finish — $6,000 prize"],
            github: "",
            live: "",
            emoji: "🛰️",
            color: "#22c55e",
        },
        {
            title: "Safe Maps",
            date: "2025",
            description:
                "Find the safest walking route in Vancouver—not just the fastest. Uses historical crime data (VPD GeoDASH) and street lighting density; night mode weights lighting more heavily.",
            tech: ["React", "Vite", "Leaflet", "Node.js", "Express"],
            highlights: [
                "Safety-first routing with multiple alternatives ranked by safety score",
                "Crime-aware routing; optional night walking mode",
                "API: GET /api/route with from, to, night query params",
            ],
            github: "",
            live: "",
            emoji: "",
            color: "#f97316",
        },
        {
            title: "PolterGuide",
            date: "ProduHacks",
            description:
                "Electron desktop app: agentic AI co-pilot as a transparent overlay with a 'Ghost Cursor' that navigates UIs from uploaded PDF docs—voice or chat driven. Honorable mention for Best Use of Gemini AI.",
            tech: ["Electron", "React 19", "Vite", "Tailwind CSS v4", "Framer Motion", "Python", "FastAPI", "WebSockets", "Firebase", "Fetch.ai uAgents", "Google GenAI", "ElevenLabs", "Web Speech API"],
            highlights: [
                "Multi-agent backend (Knowledge, Vision, Context, Completion) with real-time streaming",
                "Vision agent maps UI to coordinates for cursor control; resilient WebSocket layer",
            ],
            github: "",
            live: "",
            emoji: "",
            color: "#8b5cf6",
        },
    ],

    // ----------------------------------------------------------
    // EXPERIENCE — add/remove jobs freely
    // ----------------------------------------------------------
    experience: [
        {
            role: "Backend Engineer",
            company: "Lintel AI",
            location: "Vancouver, BC",
            period: "February 2026 – Present",
            type: "Part-time",
            emoji: "",
            points: [
                "Built Django REST APIs for production features used by internal tools and customer-facing workflows",
                "Designed database schemas and optimized queries, improving API response times and reliability",
                "Implemented authentication, validation, and error handling to improve system robustness",
                "Collaborated with frontend engineers to ship end-to-end features on tight deadlines",
            ],
        },
        {
            role: "Undergraduate Teaching Assistant (CPSC 121)",
            company: "University of British Columbia",
            location: "Vancouver, BC",
            period: "January 2026 – Present",
            type: "",
            emoji: "",
            points: [
                "Led weekly labs for 40+ students covering Boolean algebra, logic, DFAs, and proof techniques",
                "Instructed weekly discussion sections covering logic, automata, and proof-based problem solving",
                "Held office hours supporting 50+ students with proofs, algorithm correctness, and exam prep",
            ],
        },
        {
            role: "Competitive Programming Coach / Teacher",
            company: "Indonesia (online / part-time)",
            location: "Indonesia",
            period: "September 2024 – June 2025",
            type: "Part-time (~1 year); ended when moving to Canada and workload increased",
            emoji: "",
            points: [
                "Taught 100+ students C++ and contest-style algorithms and data structures",
                "Ran practice sessions, mock contests, and detailed solution reviews",
            ],
        },
    ],
};
