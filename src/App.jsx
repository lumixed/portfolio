import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Code, Briefcase, GraduationCap, Award, User, ChevronDown, Sparkles, Terminal, Zap, Rocket, Star, FileText, Download } from 'lucide-react';

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [typedText, setTypedText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const roles = ["Backend Engineer", "Competitive Programmer", "Problem Solver", "CS Student"];
    const [currentRole, setCurrentRole] = useState(0);
    const [roleText, setRoleText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Add resume URL here - replace with your actual Google Drive link
    const resumeUrl = "https://drive.google.com/file/d/1BPbc-7iMxiq7YbNvmg9cEK17AqZper8K/view?usp=drive_link";

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
        const handleScroll = () => {
            setScrollY(window.scrollY);

            const sections = ['hero', 'about', 'experience', 'projects', 'skills'];
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

    // Floating icons
    const floatingIcons = [
        { Icon: Code, x: 10, y: 20, delay: 0 },
        { Icon: Terminal, x: 85, y: 15, delay: 1 },
        { Icon: Rocket, x: 15, y: 80, delay: 2 },
        { Icon: Zap, x: 90, y: 75, delay: 1.5 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full bg-slate-400/10"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animation: `float ${particle.duration}s ease-in-out infinite`,
                            animationDelay: `${particle.delay}s`
                        }}
                    />
                ))}

                {/* Floating Icons */}
                {floatingIcons.map((item, i) => (
                    <div
                        key={i}
                        className="absolute text-slate-400/5"
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            animation: `floatSlow 6s ease-in-out infinite`,
                            animationDelay: `${item.delay}s`
                        }}
                    >
                        <item.Icon size={48} />
                    </div>
                ))}
            </div>

            {/* Mouse follower gradient */}
            <div
                className="fixed inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 116, 139, 0.08), transparent 40%)`,
                    opacity: 0.5
                }}
            />

            {/* Grid overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-3"
                style={{
                    backgroundImage: 'linear-gradient(rgba(100, 116, 139, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 116, 139, 0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 z-50 transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold flex items-center gap-2 group cursor-pointer">
                        <Sparkles className="text-slate-400 group-hover:rotate-180 transition-transform duration-500" size={20} />
                        <span className="bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">JD</span>
                    </h1>
                    <div className="flex gap-6">
                        {[
                            { id: 'hero', label: 'Home' },
                            { id: 'about', label: 'About' },
                            { id: 'experience', label: 'Experience' },
                            { id: 'projects', label: 'Projects' },
                            { id: 'skills', label: 'Skills' }
                        ].map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`relative capitalize transition-all duration-300 hover:scale-110 ${activeSection === section.id ? 'text-slate-300' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {section.label}
                                {activeSection === section.id && (
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-400 to-slate-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center pt-20 pb-20 px-6 relative">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex items-start gap-12">
                        {/* Profile Image with Multiple Animated Rings */}
                        <div className="flex-shrink-0 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400 rounded-2xl opacity-10 animate-spin-slow"></div>
                            <div className="relative w-64 h-64 rounded-2xl bg-slate-800 border-4 border-transparent bg-clip-padding flex items-center justify-center overflow-hidden transform group-hover:scale-105 transition-all duration-500"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, rgb(148, 163, 184), rgb(100, 116, 139), rgb(148, 163, 184))',
                                    padding: '4px'
                                }}
                            >
                                <div className="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center">
                                    <img 
                                        src="/profile.jpg" 
                                        alt="Jefferson Abraham Dermawan" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                    />
                                </div>
                            </div>
                            <p className="text-center text-slate-400 text-sm mt-3"></p>

                            {/* Orbiting stars */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                                <Star className="absolute text-slate-400 animate-ping opacity-50" size={16} style={{ top: '10%', left: '90%' }} />
                                <Star className="absolute text-slate-400 animate-ping opacity-50" size={12} style={{ top: '80%', right: '90%', animationDelay: '1s' }} />
                            </div>
                        </div>

                        {/* Hero Content with Typing Animation */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-2 h-16 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-400"></div>
                                <div>
                                    <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent"
                                        style={{
                                            backgroundSize: '200% 200%',
                                            animation: 'gradient 3s ease infinite'
                                        }}
                                    >
                                        Jefferson Abraham Dermawan
                                    </h1>
                                    <div className="text-2xl text-slate-400 h-8 flex items-center">
                                        <Terminal className="mr-2" size={24} />
                                        <span>{roleText}</span>
                                        <span className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-300 text-lg mt-6 leading-relaxed animate-fadeIn">
                                Third-year CS student at UBC with a passion for building scalable backend systems and solving complex algorithmic problems.
                                Full-ride scholarship recipient and competitive programming medalist.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <a href="mailto:jeffersonabrahamdermawan@gmail.com" className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 group">
                                    <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                                    Contact Me
                                </a>
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 group"
                                >
                                    <FileText size={20} className="group-hover:rotate-12 transition-transform" />
                                    Resume
                                </a>
                                <a href="https://github.com/lumixed" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                                    <Github size={20} className="group-hover:rotate-12 transition-transform" />
                                    GitHub
                                </a>
                                <a href="https://linkedin.com/in/jeffersondermawan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
                                    <Linkedin size={20} className="group-hover:rotate-12 transition-transform" />
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
                    <ChevronDown className="text-slate-400" size={32} />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 bg-slate-800/30 backdrop-blur-sm relative">
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
            <section id="projects" className="py-20 px-6 bg-slate-800/30 backdrop-blur-sm relative">
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
                                                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 text-sm hover:scale-110 hover:shadow-lg group/btn"
                                            >
                                                <Github size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                Code
                                            </a>
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.color} rounded-lg transition-all duration-300 text-sm hover:scale-110 hover:shadow-2xl group/btn`}
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
                                            className={`px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300 cursor-default hover:scale-110 hover:rotate-3 hover:shadow-lg relative`}
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

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
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
        </div>
    );
}