import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, ExternalLink, Download, User, Briefcase, GraduationCap, Award, Code, FolderOpen, MessageCircle, Star, Sparkles, Zap, Heart, ArrowRight, ChevronDown } from 'lucide-react';

function App() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const phrases = [
    "Hi, I'm Avantika Padhi! ✨",
    "A MERN Stack Developer 🚀",
    "Crafting Robust Web Apps 💻",
    "Solving Problems with Code 🎯"
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
        setTimeout(() => {}, 500);
        return;
      }
    };

    const speed = isDeleting ? 50 : 120;
    const timer = setTimeout(typeWriter, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  // Smooth scrolling function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 font-sans overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'nav-scrolled' : 'nav-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4 md:mb-0 text-center md:text-left animate-pulse-glow">
              <Sparkles className="inline-block mr-2" size={24} />
              Avantika Padhi
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8 text-sm md:text-base font-medium">
              {['about', 'experience', 'education', 'certifications', 'skills', 'projects', 'contact'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)} 
                  className="nav-link group"
                >
                  <span className="relative">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                    <span className="nav-underline"></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Hero Section */}
        <section id="about" className={`hero-section mb-12 ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center relative">
            {/* Floating particles around profile */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
            </div>
            
            <div className="mb-8 relative">
              <div className="profile-container">
                <img 
                  src="/avantika.jpeg"
                  alt="Avantika Padhi" 
                  className="profile-image"
                />
                <div className="profile-ring"></div>
                <div className="profile-glow"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 min-h-[4rem] md:min-h-[5rem] lg:min-h-[7rem]">
              <span className="typing-text bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse text-amber-400">|</span>
            </h1>
            
            <p className="text-lg md:text-xl font-light mb-8 leading-relaxed text-gray-200 max-w-4xl mx-auto animate-fade-in-delayed">
              A passionate <span className="highlight-text">MERN Stack Developer</span> with experience building{' '}
              <span className="highlight-text">responsive and scalable web applications</span>. I thrive on{' '}
              <span className="highlight-text">crafting robust back-ends and intuitive front-ends</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-delayed-2">
              <button 
                onClick={() => scrollToSection('projects')} 
                className="btn-primary group"
              >
                <FolderOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>View My Work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a 
                href="#" 
                download 
                className="btn-secondary group"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                <span>Download Resume</span>
                <Sparkles size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown size={32} className="text-amber-400 opacity-70" />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`section-card mb-12 ${isVisible.experience ? 'animate-slide-in-left' : 'opacity-0'}`}>
          <h2 className="section-title">
            <Briefcase className="inline-block mr-3 animate-pulse" size={36} />
            Experience
            <Zap className="inline-block ml-3 text-yellow-400" size={24} />
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Participant & Lead Developer",
                company: "Smart Delhi Ideathon, Delhi",
                period: "Feb 2024 – Feb 2024",
                achievements: [
                  "Developed \"UrbanEase\", a responsive website prototype with Google Maps integration to solve traffic congestion.",
                  "Enabled AI vehicle and parking spot availability detection to reduce Delhi's traffic congestion.",
                  "Showcased innovative solutions for urban mobility challenges."
                ]
              },
              {
                title: "Program Participant",
                company: "Various College Tech Programs (Online)",
                period: "Jan 2023 – Present",
                achievements: [
                  "Participated in various college tech programs with designated mentors.",
                  "Attended sessions on MERN Stack Development, Open Source, and DevOps.",
                  "Gained foundational knowledge in AI/ML basics.",
                  "Enhanced technical skills through practical demonstrations and exercises."
                ]
              }
            ].map((exp, index) => (
              <div key={index} className="experience-item group">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2 group-hover:scale-105 transition-transform duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-400 mb-3 flex items-center">
                      <Star className="mr-2 text-amber-400" size={16} />
                      {exp.company}
                    </p>
                    <ul className="list-none text-gray-300 space-y-2 text-sm md:text-base">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <Sparkles className="mr-2 mt-1 text-amber-400 flex-shrink-0" size={14} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm md:text-base text-gray-500 mt-3 lg:mt-0 lg:ml-6 lg:text-right bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                    {exp.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className={`section-card mb-12 ${isVisible.education ? 'animate-slide-in-right' : 'opacity-0'}`}
        >
          <h2 className="section-title">
            <GraduationCap className="inline-block mr-3 animate-pulse" size={36} />
            Education
            <Star className="inline-block ml-3 text-yellow-400" size={24} />
          </h2>
          <div className="space-y-8">
            {[
              {
                institution: "Dr. Akhilesh Das Gupta Institute of Professional Studies",
                degree: "Bachelor of Technology in Computer Science",
                affiliation: "Affiliated to Guru Gobind Singh Indraprastha University (GGSIPU), Delhi",
                grade: "CGPA: 9.803 (Till 2nd Year)",
                details: ["Relevant Coursework: MERN Stack - Web Development, Data Structures & Algorithms, Database Management, Object-Oriented Programming"]
              },
              {
                institution: "Mayur Public School, Delhi",
                degree: "Higher Secondary (12th Grade)",
                grade: "Percentage: 95.4%"
              },
              {
                institution: "Mayur Public School, Delhi",
                degree: "Secondary (10th Grade)",
                grade: "Percentage: 89%"
              }
            ].map((edu, index) => (
              <div key={index} className="education-item group hover:transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                  {edu.institution}
                </h3>
                <p className="text-base md:text-lg text-gray-400 mb-1 flex items-center">
                  <Award className="mr-2 text-amber-400" size={16} />
                  {edu.degree}
                </p>
                {edu.affiliation && (
                  <p className="text-sm md:text-base text-gray-500 mb-3">{edu.affiliation}</p>
                )}
                <p className="text-sm md:text-base text-gray-500 mb-3">
                  <span className="font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    {edu.grade}
                  </span>
                </p>
                {edu.details && (
                  <ul className="list-none text-gray-300 space-y-1 text-sm md:text-base">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <Sparkles className="mr-2 mt-1 text-amber-400 flex-shrink-0" size={14} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className={`section-card mb-12 ${isVisible.skills ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="section-title">
            <Code className="inline-block mr-3 animate-pulse" size={36} />
            Skills
            <Zap className="inline-block ml-3 text-yellow-400" size={24} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "MERN Stack",
                skills: "MongoDB, Express.js, React.js, Node.js",
                icon: "🚀",
                color: "from-green-400 to-blue-500"
              },
              {
                title: "Frontend Development",
                skills: "HTML5, CSS3, JavaScript (ES6+), React.js, Redux, Tailwind CSS, Bootstrap",
                icon: "🎨",
                color: "from-pink-400 to-purple-500"
              },
              {
                title: "Backend Development",
                skills: "Node.js, Express.js, RESTful APIs, Passport.js, JWT, Socket.io",
                icon: "⚙️",
                color: "from-yellow-400 to-orange-500"
              },
              {
                title: "Databases",
                skills: "MongoDB, Mongoose, PostgreSQL, MySQL",
                icon: "🗄️",
                color: "from-blue-400 to-indigo-500"
              },
              {
                title: "Tools & Version Control",
                skills: "Git, GitHub, VS Code, npm, Yarn, Postman, Heroku, Netlify",
                icon: "🛠️",
                color: "from-red-400 to-pink-500"
              },
              {
                title: "Soft Skills",
                skills: "Problem-solving, Collaboration, Agile Methodologies, Communication, Adaptability, Learning Agility",
                icon: "🧠",
                color: "from-purple-400 to-pink-500"
              }
            ].map((skill, index) => (
              <div key={index} className="skill-card group">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3 group-hover:animate-bounce">{skill.icon}</span>
                  <h3 className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                    {skill.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm md:text-base">{skill.skills}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section
          id="certifications"
          className={`section-card mb-12 ${isVisible.certifications ? 'animate-slide-in-left' : 'opacity-0'}`}
        >
          <h2 className="section-title">
            <Award className="inline-block mr-3 animate-pulse" size={36} />
            Certifications
            <Sparkles className="inline-block ml-3 text-yellow-400" size={24} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Udemy MERN Stack", link: "#", icon: "🎓" },
              { name: "Great Learning OOPS with C++", link: "#", icon: "💻" },
              { name: "Smart Delhi Ideathon Certificate", link: "#", icon: "🏆" },
              { name: "Data Analytics Certification (HP)", link: "#", icon: "📊" },
              { name: "Microsoft Copilot 365 (LinkedIn Certified)", link: "#", icon: "🤖" },
              { name: "Basics of AI and Generative AI (LinkedIn Certified)", link: "#", icon: "🧠" }
            ].map((cert, index) => (
              <div key={index} className="certification-item group">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{cert.icon}</span>
                  <p className="text-base md:text-lg text-gray-300 flex-1">
                    <span className="text-amber-400 font-semibold">•</span> {cert.name}
                  </p>
                </div>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="certificate-link group-hover:translate-x-2 transition-transform duration-300"
                >
                  <span>View Certificate</span>
                  <ExternalLink size={16} className="group-hover:rotate-45 transition-transform duration-300" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`section-card mb-12 ${isVisible.projects ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="section-title">
            <FolderOpen className="inline-block mr-3 animate-pulse" size={36} />
            Projects
            <Star className="inline-block ml-3 text-yellow-400" size={24} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Web App",
                description: "A full-stack e-commerce platform built with MERN stack, featuring user authentication, product management, shopping cart functionality, and payment integration.",
                technologies: "React, Node.js, Express, MongoDB, Redux, JWT, Stripe API",
                github: "https://github.com/your-github/ecommerce-mern-app",
                demo: "#",
                icon: "🛒",
                color: "from-green-400 to-blue-500"
              },
              {
                title: "Task Management System",
                description: "A collaborative task management application allowing users to create, assign, and track tasks. Features real-time updates and notifications.",
                technologies: "React, Node.js, Express, MongoDB, Socket.io",
                github: "https://github.com/your-github/task-manager-mern",
                demo: "#",
                icon: "📋",
                color: "from-purple-400 to-pink-500"
              },
              {
                title: "Social Media Clone",
                description: "A simplified social media platform where users can post updates, follow others, and interact with content.",
                technologies: "React, Node.js, Express, MongoDB, Cloudinary",
                github: "https://github.com/your-github/social-media-clone-mern",
                demo: null,
                icon: "📱",
                color: "from-blue-400 to-indigo-500"
              }
            ].map((project, index) => (
              <div key={index} className="project-card group">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3 group-hover:animate-spin">{project.icon}</span>
                  <h3 className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm md:text-base">{project.description}</p>
                <p className="text-gray-400 text-xs md:text-sm mb-6">
                  <span className="font-semibold text-amber-400">Technologies:</span> {project.technologies}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link group/link"
                  >
                    <Github size={16} className="group-hover/link:rotate-12 transition-transform duration-300" />
                    <span>GitHub</span>
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link group/link"
                    >
                      <ExternalLink size={16} className="group-hover/link:rotate-45 transition-transform duration-300" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`section-card mb-12 ${isVisible.contact ? 'animate-slide-in-right' : 'opacity-0'}`}
        >
          <h2 className="section-title">
            <MessageCircle className="inline-block mr-3 animate-pulse" size={36} />
            Get In Touch
            <Heart className="inline-block ml-3 text-red-400 animate-pulse" size={24} />
          </h2>
          <div className="text-center">
            <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              I'm currently seeking new opportunities as a MERN Stack Developer and would love to connect. 
              <span className="highlight-text"> Let's build something amazing together!</span>
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              {[
                { href: "mailto:your.email@example.com", icon: Mail, title: "Email", color: "hover:text-red-400" },
                { href: "https://www.linkedin.com/in/avantika-padhi-a40bb8303/", icon: Linkedin, title: "LinkedIn", color: "hover:text-blue-400" },
                { href: "https://github.com/your-github", icon: Github, title: "GitHub", color: "hover:text-purple-400" }
              ].map((contact, index) => (
                <a 
                  key={index}
                  href={contact.href} 
                  target={contact.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={`contact-icon group ${contact.color}`}
                  title={contact.title}
                >
                  <contact.icon size={32} className="group-hover:animate-bounce" />
                </a>
              ))}
            </div>
            <div className="animate-pulse">
              <Sparkles className="mx-auto text-amber-400" size={24} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-t border-gray-700 py-8 mt-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-gray-400 mb-2 flex items-center justify-center">
            &copy; {currentYear} Avantika Padhi. All rights reserved.
            <Sparkles className="ml-2 text-amber-400" size={16} />
          </p>
          <p className="text-sm text-gray-500 flex items-center justify-center">
            Built with <Heart className="mx-1 text-red-500 animate-pulse" size={16} /> and React in the digital cosmos.
            <Star className="ml-2 text-amber-400 animate-pulse" size={16} />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
