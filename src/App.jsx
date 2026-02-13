import React, { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Briefcase, GraduationCap, Award, User, ChevronDown, Sparkles, Terminal, Zap, Rocket, Star, FileText } from 'lucide-react';

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('hero');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(true);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const roles = useMemo(() => ["Backend Engineer", "Competitive Programmer", "Problem Solver", "CS Student"], []);
    const [currentRole, setCurrentRole] = useState(0);
    const [roleText, setRoleText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Add resume URL here - replace with your actual Google Drive link
    const resumeUrl = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

    // Typing animation for role
    useEffect(() => {
        const role = roles[currentRole];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (roleText.length < role.length) {
                    setRoleText(role.substring(0, roleText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (roleText.length > 0) {
                    setRoleText(roleText.substring(0, roleText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentRole((currentRole + 1) % roles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [roleText, isDeleting, currentRole, roles]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

        const handleScroll = () => {
            const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const projects = [
        {
            title: "AwardScope",
            date: "February 2026",
            description: "Full-stack web app matching BC post-secondary students with relevant scholarships",
            tech: ["React", "TypeScript", "Node.js", "MongoDB"],
            highlights: [
                "Designed REST APIs and matching algorithm to rank awards by eligibility",
                "Integrated Gemini API for personalized application advice",
                "Containerized backend with Docker and deployed with migrations"
            ],
            github: "https://github.com/lumixed/awardscope",
            live: "https://awardscope.vercel.app",
            icon: Rocket,
            color: "from-cyan-400 to-blue-500"
        },
        {
            title: "Travelio",
            date: "January 2026",
            description: "Travel-planning web app built during 24-hour hackathon",
            tech: ["Python", "HTML", "React", "CSS", "JavaScript"],
            highlights: [
                "Utilized Amadeus Travel API and Gemini API",
                "Handled slow API responses with async requests and caching"
            ],
            github: "https://github.com/lumixed/travelio",
            live: "",
            icon: Zap,
            color: "from-purple-400 to-pink-500"
        }
    ];

    const experience = [
        {
            role: "Backend Engineer",
            company: "Lintel AI",
            location: "Vancouver, BC",
            period: "February 2026 – Present",
            type: "Part-time",
            icon: Terminal,
            points: [
                "Built Django REST APIs for production features used by internal tools and customer-facing workflows",
                "Designed database schemas and optimized queries, improving API response times and reliability",
                "Implemented authentication, validation, and error handling to improve system robustness",
                "Collaborated with frontend engineers to ship end-to-end features on tight deadlines"
            ]
        },
        {
            role: "Undergraduate Teaching Assistant (CPSC 121)",
            company: "University of British Columbia",
            location: "Vancouver, BC",
            period: "January 2026 – Present",
            type: "",
            icon: GraduationCap,
            points: [
                "Led weekly labs for 40+ students covering Boolean algebra, logic, DFAs, and proof techniques",
                "Instructed weekly discussion sections covering logic, automata, and proof-based problem solving",
                "Held weekly office hours supporting 50+ students with proofs, algorithm correctness, and exam preparation"
            ]
        },
        {
            role: "Competitive Programming Coach",
            company: "Indonesia",
            location: "Indonesia",
            period: "September 2024 – June 2025",
            type: "",
            icon: Code,
            points: [
                "Coached 100+ students in C++ algorithmic problem-solving and data structures",
                "Designed and led online practice sessions focused on problem decomposition, edge cases, and optimization",
                "Improved students' contest performance through targeted feedback, mock contests, and in-depth solution reviews"
            ]
        }
    ];

    // Floating particles animation
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2
    }));


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full bg-slate-400/5 backdrop-blur-3xl"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animation: `float ${particle.duration}s ease-in-out infinite`,
                            animationDelay: `${particle.delay}s`,
                            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
                        }}
                    />
                ))}

                {/* Subtle Ambient Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full -ml-64 -mb-64"></div>

                {/* Aesthetic Floating Blobs */}
                <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] animate-blob transition-transform duration-[10s]"></div>
                <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000 transition-transform duration-[12s]"></div>
                <div className="absolute bottom-[20%] left-[15%] w-64 h-64 bg-slate-400/10 rounded-full blur-[60px] animate-blob animation-delay-4000 transition-transform duration-[8s]"></div>
            </div>


            {/* Ambient background effects */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(100, 116, 139, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            <div
                className="fixed inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 116, 139, 0.08), transparent 40%)`,
                    opacity: 0.5
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-900/40 backdrop-blur-xl border-b border-white/5 z-50 transition-all duration-300">
                <div className="w-full px-4 md:px-6 py-4 flex justify-center items-center">
                    <div className="flex gap-1 p-1 bg-white/5 rounded-full backdrop-blur-md border border-white/5 overflow-x-auto no-scrollbar max-w-[280px] md:max-w-none">
                        {[
                            { id: 'hero', label: 'Home' },
                            { id: 'about', label: 'About' },
                            { id: 'experience', label: 'Exp' },
                            { id: 'projects', label: 'Projects' },
                            { id: 'skills', label: 'Skills' }
                        ].map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeSection === section.id
                                    ? 'bg-white/10 text-white shadow-inner'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6 relative">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                        {/* Profile Image with Dynamic Effects */}
                        <div className="flex-shrink-0 relative group">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden glass-card p-2 border-slate-700/50">
                                <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden relative">
                                    <img
                                        src="/profile.jpg"
                                        alt="Jefferson Abraham Dermawan"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                </div>
                            </div>
                            {/* Floating badges */}
                            <div className="absolute -top-4 -right-4 bg-slate-800/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl animate-bounce-slow">
                                <Rocket className="text-blue-400" size={24} />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-slate-800/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl animate-bounce-slow-delayed">
                                <Code className="text-purple-400" size={24} />
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-medium mb-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Available for New Opportunities
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                <span className="block text-slate-400 text-2xl md:text-3xl mb-2 font-medium">Hello, I'm </span>
                                <span className="text-white tracking-tight">Jefferson Abraham</span>
                                <span className="block text-gradient">Dermawan</span>
                            </h1>

                            <div className="text-2xl text-slate-400 h-10 flex items-center justify-center md:justify-start font-mono">
                                <Terminal className="mr-3 text-slate-500" size={24} />
                                <span>{roleText}</span>
                                <span className={`w-2 h-8 bg-slate-400 ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
                            </div>

                            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                                Second-year Computer Science student at <span className="text-white font-medium">UBC</span>.
                                I specialize in building high-performance backend systems and crafting elegant solutions to complex algorithmic challenges.
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                <a href="mailto:jeffersonabrahamdermawan@gmail.com"
                                    className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10">
                                    Let's Talk
                                </a>
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
                                    className="px-8 py-4 glass-card text-white rounded-2xl font-bold hover:bg-white/5 transition-all duration-300 hover:scale-105 border border-white/10">
                                    View Resume
                                </a>
                                <div className="flex items-center gap-3 ml-2 lg:ml-6 border-l border-white/10 pl-6">
                                    <a href="https://github.com/lumixed" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                        <Github size={24} />
                                    </a>
                                    <a href="https://linkedin.com/in/jeffersondermawan" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                        <Linkedin size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 animate-slideInLeft">
                        <GraduationCap className="text-slate-400" />
                        Education
                    </h2>
                    <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 hover:scale-[1.01] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/3 to-slate-600/3 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold">University of British Columbia</h3>
                                    <p className="text-slate-300 text-lg">Bachelor of Science in Computer Science</p>
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <Star className="text-slate-400" size={16} />
                                        GPA: 88.9%, Dean's List
                                    </p>
                                </div>
                                <span className="text-slate-400 bg-slate-800 px-4 py-2 rounded-full">Aug 2024 – Present</span>
                            </div>
                            <p className="text-slate-300 mt-4"><strong>Relevant Coursework:</strong></p>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-slate-400">
                                {[
                                    "CPSC 110 - Computation, Programs, and Programming",
                                    "CPSC 121 - Models of Computation",
                                    "CPSC 213 - Computer Systems",
                                    "CPSC 221 - Algorithms and Data Structures",
                                    "CPSC 210 - Software Construction",
                                    "CPSC 310 - Software Engineering",
                                    "CPSC 313 - Hardware and Operating Systems"
                                ].map((course, i) => (
                                    <span key={i} className="hover:text-slate-300 hover:translate-x-2 transition-all duration-200 cursor-default">• {course}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mt-16 mb-8 flex items-center gap-3 animate-slideInLeft">
                        <Award className="text-slate-400" />
                        Accomplishments
                    </h2>
                    <div className="grid gap-4">
                        {[
                            { text: "Awarded a <strong>full-ride scholarship</strong> to pursue undergraduate studies at UBC", emoji: "🏆" },
                            { text: "Ranked <strong>Top 32</strong> competitive programmer nationally in the 2022 Indonesian National Olympiad in Informatics", emoji: "🥇" }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 hover:scale-[1.01] relative overflow-hidden group cursor-default">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/3 to-slate-600/3 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                <p className="text-lg relative z-10 flex items-center gap-3">
                                    <span className="text-3xl" style={{ animationDelay: `${i * 0.2}s` }}>{item.emoji}</span>
                                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 animate-slideInLeft">
                        <Briefcase className="text-slate-400" />
                        Experience
                    </h2>
                    <div className="space-y-8">
                        {experience.map((exp, idx) => {
                            const Icon = exp.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1 relative overflow-hidden group"
                                    style={{
                                        animation: `slideInRight 0.5s ease-out ${idx * 0.1}s both`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-500/3 to-slate-600/3 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                    <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                                        <Icon size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-3 bg-slate-700/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                                    <Icon className="text-slate-400" size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold group-hover:text-slate-200 transition-colors duration-300">{exp.role}</h3>
                                                    <p className="text-slate-300 text-lg">{exp.company} {exp.type && `• ${exp.type}`}</p>
                                                    <p className="text-slate-400">{exp.location}</p>
                                                </div>
                                            </div>
                                            <span className="text-slate-400 text-sm bg-slate-800 px-4 py-2 rounded-full whitespace-nowrap">{exp.period}</span>
                                        </div>
                                        <ul className="space-y-2 mt-4">
                                            {exp.points.map((point, i) => (
                                                <li key={i} className="text-slate-300 flex gap-2 hover:text-white hover:translate-x-2 transition-all duration-300">
                                                    <span className="text-slate-400 mt-1">▹</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 animate-slideInLeft">
                        <Code className="text-slate-400" />
                        Projects
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, idx) => {
                            const Icon = project.icon;
                            return (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setHoveredProject(idx)}
                                    onMouseLeave={() => setHoveredProject(null)}
                                    className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-2 relative overflow-hidden group cursor-pointer"
                                    style={{
                                        animation: `zoomIn 0.5s ease-out ${idx * 0.2}s both`
                                    }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                                    <div className="absolute -top-10 -right-10 opacity-3 group-hover:opacity-8 transition-all duration-500 group-hover:rotate-12">
                                        <Icon size={120} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 bg-gradient-to-br ${project.color} opacity-60 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                                                    <Icon className="text-white" size={24} />
                                                </div>
                                                <h3 className="text-2xl font-bold group-hover:text-slate-200 transition-all duration-300">{project.title}</h3>
                                            </div>
                                            <span className="text-slate-400 text-sm bg-slate-800 px-3 py-1 rounded-full">{project.date}</span>
                                        </div>
                                        <p className="text-slate-300 mb-4 group-hover:text-white transition-colors duration-300">{project.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm hover:bg-slate-600/50 hover:scale-110 transition-all duration-300 cursor-default"
                                                    style={{
                                                        animation: hoveredProject === idx ? `bounce 0.5s ease ${i * 0.1}s` : 'none'
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <ul className="space-y-2 mb-6">
                                            {project.highlights.map((highlight, i) => (
                                                <li key={i} className="text-slate-400 text-sm flex gap-2 hover:text-slate-200 hover:translate-x-2 transition-all duration-300">
                                                    <span className="text-slate-400">▹</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex gap-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 text-sm hover:scale-110 hover:shadow-lg group/btn font-bold"
                                            >
                                                <Github size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                Code
                                            </a>
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} rounded-lg transition-all duration-300 text-sm hover:scale-110 hover:shadow-2xl group/btn font-bold`}
                                                >
                                                    <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 animate-slideInLeft">Technical Skills</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Languages", skills: ['Python', 'Java', 'C/C++', 'TypeScript', 'JavaScript', 'HTML/CSS'], gradient: 'from-slate-400 to-slate-500' },
                            { title: "Frameworks", skills: ['React', 'Node.js', 'Express', 'Django', 'Flask'], gradient: 'from-slate-500 to-slate-400' },
                            { title: "Tools", skills: ['Git', 'Docker', 'GCP', 'VS Code', 'IntelliJ'], gradient: 'from-slate-400 to-slate-600' },
                            { title: "Libraries", skills: ['NumPy', 'React Router', 'Gemini API'], gradient: 'from-slate-500 to-slate-400' }
                        ].map((category, idx) => (
                            <div
                                key={category.title}
                                className="bg-slate-900/50 rounded-xl p-8 border border-slate-700 hover:border-slate-500 transition-all duration-500 hover:shadow-xl hover:shadow-slate-500/10 transform hover:-translate-y-1 relative overflow-hidden group"
                                style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                                <h3 className={`text-xl font-bold mb-4 text-slate-300 relative z-10`}>{category.title}</h3>
                                <div className="flex flex-wrap gap-3 relative z-10">
                                    {category.skills.map((skill, i) => (
                                        <span
                                            key={skill}
                                            onMouseEnter={() => setHoveredSkill(`${idx}-${i}`)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                            className={`px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300 cursor-default hover:scale-110 hover:rotate-3 hover:shadow-lg relative text-sm`}
                                            style={{
                                                animation: hoveredSkill === `${idx}-${i}` ? 'wiggle 0.5s ease' : 'none',
                                                animationDelay: `${i * 0.05}s`
                                            }}
                                        >
                                            {skill}
                                            {hoveredSkill === `${idx}-${i}` && (
                                                <span className="absolute -top-1 -right-1">
                                                    <Sparkles size={12} className="text-slate-400 animate-ping" />
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="section-reveal">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
                            Ready to <span className="text-gradient">build</span> something amazing?
                        </h2>
                        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <a href="mailto:jeffersonabrahamdermawan@gmail.com"
                                className="w-full md:w-auto px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl hover:bg-slate-200 transition-all duration-300 hover:scale-105 shadow-2xl shadow-white/10 group">
                                Start a Conversation
                            </a>
                            <div className="flex items-center gap-4">
                                {[
                                    { icon: Github, href: "https://github.com/lumixed" },
                                    { icon: Linkedin, href: "https://linkedin.com/in/jeffersondermawan" },
                                    { icon: Mail, href: "mailto:jeffersonabrahamdermawan@gmail.com" }
                                ].map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                                        className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 transition-all duration-300">
                                        <social.icon size={28} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/5 to-transparent"></div>
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <div className="flex justify-center gap-6 mb-4">
                        {[
                            { href: "mailto:jeffersonabrahamdermawan@gmail.com", icon: Mail, color: "hover:text-slate-300" },
                            { href: "tel:2369835367", icon: Phone, color: "hover:text-slate-300" },
                            { href: "https://github.com/lumixed", icon: Github, color: "hover:text-slate-300" },
                            { href: "https://linkedin.com/in/jeffersondermawan", icon: Linkedin, color: "hover:text-slate-300" }
                        ].map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                target={link.href.startsWith('http') ? "_blank" : undefined}
                                rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className={`text-slate-400 ${link.color} transition-all duration-300 hover:scale-125 group`}
                            >
                                <link.icon size={24} />
                            </a>
                        ))}
                    </div>
                    <p className="text-slate-400">© 2026 Jefferson Abraham Dermawan. All rights reserved.</p>
                </div>
            </footer>

            <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(10px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div >
    );
}