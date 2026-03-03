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

    bio: `I'm a second-year Computer Science student at the University of British Columbia (UBC), specializing in backend engineering and competitive programming. I love tackling hard algorithmic challenges and shipping production-ready systems. Currently working part-time as a Backend Engineer at Lintel AI, while TAing CPSC 121 at UBC.`,

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
            period: "Aug 2024 – Present",
            gpa: "88.9% GPA · Dean's List",
            courses: [
                "CPSC 110 — Computation, Programs & Programming",
                "CPSC 121 — Models of Computation",
                "CPSC 213 — Computer Systems",
                "CPSC 221 — Algorithms & Data Structures",
                "CPSC 210 — Software Construction",
                "CPSC 310 — Software Engineering",
                "CPSC 313 — Hardware & Operating Systems",
            ],
        },
    ],

    // ----------------------------------------------------------
    // ACCOMPLISHMENTS
    // ----------------------------------------------------------
    accomplishments: [
        "Awarded a full-ride scholarship to pursue undergraduate studies at UBC",
        "Ranked Top 32 competitive programmer nationally in the 2022 Indonesian National Olympiad in Informatics (IOI)",
    ],

    // ----------------------------------------------------------
    // SKILLS — add/remove technologies freely
    // ----------------------------------------------------------
    skills: {
        Languages: ["Python", "Java", "C/C++", "TypeScript", "JavaScript", "HTML/CSS"],
        Frameworks: ["React", "Node.js", "Express", "Django", "Flask"],
        Tools: ["Git", "Docker", "GCP", "VS Code", "IntelliJ"],
        Libraries: ["NumPy", "React Router", "Gemini API"],
    },

    // ----------------------------------------------------------
    // PROJECTS — add as many objects as you want
    // ----------------------------------------------------------
    projects: [
        {
            title: "AwardScope",
            date: "February 2026",
            description:
                "Full-stack web app matching BC post-secondary students with relevant scholarships using a ranking algorithm and AI personalization.",
            tech: ["React", "TypeScript", "Node.js", "MongoDB"],
            highlights: [
                "Designed REST APIs and matching algorithm to rank awards by eligibility",
                "Integrated Gemini API for personalized application advice",
                "Containerized backend with Docker and deployed with migrations",
            ],
            github: "https://github.com/lumixed/awardscope",
            live: "https://awardscope.vercel.app",
            emoji: "",
            color: "#38bdf8",
        },
        {
            title: "Travelio",
            date: "January 2026",
            description:
                "AI-powered travel-planning web app built during a 24-hour hackathon, leveraging Amadeus and Gemini APIs.",
            tech: ["Python", "React", "JavaScript", "CSS"],
            highlights: [
                "Utilized Amadeus Travel API and Gemini API for itinerary generation",
                "Handled slow API responses with async requests and response caching",
            ],
            github: "https://github.com/lumixed/travelio",
            live: "",
            emoji: "",
            color: "#a78bfa",
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
            role: "Competitive Programming Coach",
            company: "Indonesia",
            location: "Indonesia",
            period: "September 2024 – June 2025",
            type: "",
            emoji: "",
            points: [
                "Coached 100+ students in C++ algorithmic problem-solving and data structures",
                "Designed online practice sessions focused on problem decomposition and optimization",
                "Improved students' contest performance through mock contests and in-depth solution reviews",
            ],
        },
    ],
};
