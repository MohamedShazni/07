import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Zap,
  Users,
  ArrowRight,
  BaggageClaim,
  Footprints,
  MoveIcon,
  Download,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: React.ReactNode;
  link?: string; // Optional link for the project
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  color: string;
}

interface VisibilityState {
  [key: string]: boolean;
}

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section: Element) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string): void => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  const skills: Skill[] = [
    { name: "React.js", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript", level: 90, color: "from-yellow-500 to-orange-500" },
    { name: "TypeScript", level: 85, color: "from-blue-600 to-purple-600" },
    { name: "Node.js", level: 80, color: "from-green-500 to-emerald-500" },
    { name: "Python", level: 75, color: "from-indigo-500 to-purple-500" },
    { name: "MySQL", level: 85, color: "from-pink-500 to-rose-500" },
    { name: "PHP", level: 90, color: "from-green-500 to-emerald-500" },
  ];

  const projects: Project[] = [
    {
      title: "VITISCO Learning Platform",
      description:
        "Full-stack learning platform for deaf individuals with React, Node.js, and MySQL",
      tags: ["React", "Node.js", "MySQL"],
      gradient: "from-purple-600 via-pink-600 to-red-500",
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: "S7 Futsal Booking System",
      description:
        "Real-time booking system for futsal courts with React and Tailwind CSS",
      tags: ["React", "Tailwind CSS"],
      gradient: "from-blue-600 via-cyan-600 to-teal-500",
      icon: <Footprints className="w-8 h-8" />,
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with Next.Js, and MongoDB",
      tags: ["Next.Js", "Tailwind CSS"],
      gradient: "from-purple-600 via-pink-600 to-red-500",
      icon: <BaggageClaim className="w-8 h-8" />,
    },
    {
      title: "Movie Explorer App",
      description:
        "Real-time application for accessing movie information using React and The Movie Database API",
      tags: ["React", "TypeScript", "Material UI"],
      gradient: "from-indigo-600 via-purple-600 to-pink-500",
      icon: <MoveIcon className="w-8 h-8" />,
      link: "https://my-movie-explorer.vercel.app/",
    },
  ];

  const experiences: Experience[] = [
    {
      role: "Pharmacy Assistant",
      company: "Zaidah Pharmacy.",
      period: "2023 - Present",
      description:
        "Supports pharmacists in dispensing medications, managing inventory, and providing customer service",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio.
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "skills",
                "projects",
                "experience",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-cyan-400 cursor-pointer ${
                    activeSection === item ? "text-cyan-400" : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden mt-12"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <div className="w-70 h-70 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-58 h-58 rounded-full overflow-hidden">
                  <img
                    src="/Shazzzy.jpg"
                    alt="Shazzzy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hi, I am
            </span>
          </h1>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Shazni Mohamed
            </span>
          </h1>

          <p className="text-2xl md:text-3xl mb-8 text-gray-300">
            Intern Software Engineer | ML Enthusiast
          </p>

          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Crafting beautiful, functional, and user-centered digital
            experiences with modern technologies
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
            >
              View My Work
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 border-2 border-cyan-400 rounded-full font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          <div className="mt-12">
            <a
              href="/Shazni_Software Engineer_Intern_CV.pdf"
              download
              className="inline-flex items-center px-6 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              Download My Resume
              <Download className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.about
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  I am a passionate Computer Science undergraduate with hands-on
                  experience in React, JavaScript, and front-end development,
                  currently seeking an internship opportunity to apply my
                  skills, contribute to real-world projects, and grow as a
                  developer.
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  I specialize in modern web technologies and have a keen eye
                  for design. When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, or
                  mentoring fellow developers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full">
                    <Code className="w-5 h-5 text-purple-400" />
                    <span>Clean Code</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 rounded-full">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span>Team Player</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span>Fast Learner</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20">
                  <h3 className="text-2xl font-bold mb-2 text-purple-400">
                    10+
                  </h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.skills
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>

            <div className="grid gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-semibold text-gray-200">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-2000 ease-out group-hover:shadow-lg`}
                      style={{
                        width: isVisible.skills ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.projects
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative p-8">
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${project.gradient} mb-6`}
                    >
                      {project.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group/btn"
                    >
                      <span className="cursor-pointer">View Project</span>
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-black/20">
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.experience
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp.role} className="relative group">
                  <div className="flex items-start space-x-6">
                    <div
                      className={`flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} mt-2 group-hover:scale-150 transition-transform duration-300`}
                    ></div>
                    <div className="flex-grow bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 rounded-2xl border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white mb-1 md:mb-0">
                          {exp.role}
                        </h3>
                        <span className="text-cyan-400 font-semibold">
                          {exp.period}
                        </span>
                      </div>
                      <h4 className="text-lg text-purple-400 mb-3">
                        {exp.company}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent ml-2 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible.contact
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>

            <div className="text-center mb-12">
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's discuss how we can
                create something amazing together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 text-center group hover:scale-105 transition-transform duration-300">
                <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-300">mohamedshazni2004@gmail.com</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 rounded-2xl border border-cyan-500/20 text-center group hover:scale-105 transition-transform duration-300">
                <Phone className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-300">+94 77 677 1741</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/MohamedShazni/07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohamed-shazni-3101772bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Mohamed Shazni. Built with React and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
