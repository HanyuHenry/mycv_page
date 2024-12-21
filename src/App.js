import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 检测当前活动区域
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      setIsOpen(false);
      
      setTimeout(() => {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  // Transform effects
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // 导航项组件
  const NavItem = ({ id, label, isMobile = false }) => {
    const isActive = activeSection === id;
    
    return (
      <button
        onClick={() => handleNavClick(id)}
        className={`relative group px-3 py-2 transition duration-300 ${
          isMobile ? 'w-full text-left' : ''
        }`}
      >
        <span className={`relative z-10 transition duration-300 ${
          isActive ? 'text-blue-400' : 'text-white group-hover:text-blue-400'
        }`}>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId={`underline-${isMobile ? 'mobile' : 'desktop'}`}
            className={`absolute ${
              isMobile ? 'left-0 top-0 w-1 h-full' : 'bottom-0 left-0 w-full h-0.5'
            } bg-blue-400`}
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        )}
      </button>
    );
  };

  const navItems = [
    { id: 'main', label: 'Main' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'publications', label: 'Publications' }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold"
            >
              Henry E
            </motion.div>
            
            {/* Desktop Navigation */}
            <motion.div className="hidden md:flex space-x-4">
              {navItems.map(item => (
                <NavItem key={item.id} {...item} />
              ))}
            </motion.div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-blue-400 transition duration-300 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute left-0 right-0 mt-2 py-2 bg-black/95 backdrop-blur-lg shadow-xl"
            >
              <div className="flex flex-col">
                {navItems.map(item => (
                  <NavItem key={item.id} {...item} isMobile={true} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero/Main Section */}
      <section className="h-screen relative overflow-hidden" id="main">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
        >
          <div className="text-center max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Henry E
              </span>
            </motion.h1>
            <motion.h2 
              className="text-lg md:text-2xl text-gray-300 mb-8"
            >
              Ph.D. in Software and Intelligent Systems
            </motion.h2>

            {/* Contact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              {[
                {
                  icon: "✉️",
                  label: "Email",
                  value: "crocodilehy@gmail.com",
                  link: "mailto:crocodilehy@gmail.com",
                },
                {
                  icon: "📱",
                  label: "Phone",
                  value: "+1 (780) 716 1955",
                  link: "tel:+17807161955",
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Edmonton, AB, Canada",
                },
                {
                  icon: "🔗",
                  label: "LinkedIn",
                  value: "Connect with me",
                  link: "https://www.linkedin.com/in/Henry--E/",
                },
                {
                  icon: "📚",
                  label: "Google Scholar",
                  value: "View Publications",
                  link: "https://scholar.google.com/",
                },
                {
                  icon: "💻",
                  label: "GitHub",
                  value: "See My Code",
                  link: "https://github.com/",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative group"
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? "_blank" : undefined}
                      rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="block w-full h-full"
                    >
                      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl p-4 transition duration-300 transform hover:scale-105 hover:from-blue-900/40 hover:to-purple-900/40 shadow-lg">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-gray-400 text-sm">{item.label}</div>
                        <div className="text-white font-medium truncate">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-gray-400 text-sm">{item.label}</div>
                      <div className="text-white font-medium truncate">{item.value}</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Professional Summary */}
      <section className="min-h-screen relative py-32" id="about">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto px-8"
        >
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-8">Professional Summary</h2>
            <p className="text-xl text-gray-300 leading-relaxed text-justify tracking-wide">
              Software engineer with research background in machine learning and data processing. 
              Experience in both backend development and ML model deployment. 
              Demonstrated ability to improve system performance and implement automated testing solutions.
              Proven track record of delivering high-quality solutions and driving innovation in software development and artificial intelligence applications.
              Skilled in collaborating with cross-functional teams and mentoring junior developers.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="min-h-screen py-16 md:py-32" id="experience">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-16"
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-8 md:space-y-12">
            {[
              {
                title: "Postdoctoral Fellow & Project Coordinator",
                company: "University of Alberta",
                period: "Sep. 2022 – Present",
                points: [
                  "Developed and optimized machine learning models using Python, improving processing speed by 20%",
                  "Implemented automated testing procedures reducing software release cycle time by 30%",
                  "Coordinated with team members to improve development workflow and code quality",
                  "Supervised and mentored graduate students on AI research projects",
                  "Published three papers in peer-reviewed journals on ML applications"
                ]
              },
              {
                title: "Frontend Developer",
                company: "Apex Automation",
                period: "Feb. 2021 - July 2021",
                points: [
                  "Built iOS applications using Swift and SwiftUI for industrial automation",
                  "Implemented user interfaces following iOS design guidelines",
                  "Collaborated with backend team to integrate REST APIs",
                  "Reduced bug reports by 50% through improved error handling",
                  "Set up basic CI/CD pipeline using Git and Xcode"
                ]
              }
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                <div className="text-xl text-blue-400 mb-4">{job.company}</div>
                <div className="text-gray-400 mb-4">{job.period}</div>
                <ul className="space-y-3">
                  {job.points.map((point, i) => (
                    <li key={i} className="text-gray-300 text-justify">{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen py-16 md:py-32" id="skills">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-16 text-center"
          >
            Technical Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { 
                title: "Programming", 
                items: ["Python", "Java", "Javascript", "C", "SQL", "Swift"]
              },
              { 
                title: "Machine Learning", 
                items: ["PyTorch", "TensorFlow", "Scikit-learn"]
              },
              { 
                title: "Web & Mobile", 
                items: ["SwiftUI", "UIKit", "iOS Development"]
              },
              { 
                title: "Data Processing", 
                items: ["NumPy", "Pandas", "Data Analysis"]
              },
              { 
                title: "Tools", 
                items: ["Git", "AWS", "Automated Testing"]
              },
              { 
                title: "Databases", 
                items: ["MySQL", "PostgreSQL", "MongoDB"]
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map(item => (
                    <li key={item} className="text-gray-300">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-16 md:py-32" id="projects">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-16"
          >
            Key Projects
          </motion.h2>
          <div className="space-y-8 md:space-y-12">
            {[
              {
                title: "Sustainable Energy Data Solution",
                period: "Jan. 2021 - Present",
                points: [
                  "Developed machine learning models for energy consumption prediction",
                  "Used PyTorch to implement and train neural networks",
                  "Improved prediction accuracy by 30% through model optimization",
                  "Created data preprocessing pipeline for handling time-series data"
                ]
              },
              {
                title: "Smart Monitoring System",
                period: "Feb. 2021 - July 2021",
                points: [
                  "Built iOS application for truck cargo monitoring",
                  "Implemented Bluetooth connectivity for sensor data collection",
                  "Developed real-time status updates and notifications",
                  "Created user-friendly interface for drivers to monitor cargo status"
                ]
              },
              {
                title: "Data Analytics Platform",
                period: "Jun. 2018 - Feb. 2021",
                points: [
                  "Built Python-based platform for analyzing research data",
                  "Implemented data processing pipelines using NumPy and Pandas",
                  "Improved analysis speed by 25% through code optimization",
                  "Integrated machine learning models for data prediction",
                  "Developed basic API endpoints for data access"
                ]
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <div className="text-gray-400 mb-4">{project.period}</div>
                <ul className="space-y-3">
                  {project.points.map((point, i) => (
                    <li key={i} className="text-gray-300 text-justify">{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="min-h-screen py-16 md:py-32" id="education">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-16"
          >
            Education
          </motion.h2>
          <div className="space-y-8 md:space-y-12">
            {[
              {
                title: "Doctor of Philosophy (Software Engineering & AI)",
                school: "University of Alberta",
                period: "Sep. 2016 to Aug. 2022",
                focus: "Research Focus: Machine Learning Applications and Data Processing",
                description: "Specialized in developing and optimizing machine learning algorithms for real-world applications. Conducted extensive research in data processing techniques and artificial intelligence systems."
              },
              {
                title: "Bachelor's degree (Mechanical Engineering)",
                school: "Xidian University",
                period: "Sep. 2011 to Aug. 2015",
                focus: "Focus: Mechanical Systems and Control",
                description: "Developed strong foundation in engineering principles and problem-solving methodologies. Participated in multiple robotics projects and automation systems development."
              }
            ].map((edu, index) => (
              <motion.div
                key={edu.title}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-2">{edu.title}</h3>
                <div className="text-xl text-blue-400 mb-2">{edu.school}</div>
                <div className="text-gray-400 mb-2">{edu.period}</div>
                <div className="text-gray-300 font-medium mb-2">{edu.focus}</div>
                <div className="text-gray-300 text-justify">{edu.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="min-h-screen py-16 md:py-32" id="publications">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-16"
          >
            Publications
          </motion.h2>
          <div className="space-y-8">
            {[
              {
                title: "Deep Learning-Based Approach for Efficient Energy Consumption Prediction in Smart Grid Systems",
                authors: ["Johnson, M.", "Smith, K.", "Henry E", "Williams, R."],
                journal: "IEEE Transactions on Smart Grid",
                year: "2023",
                doi: "10.1109/TSG.2023.12345",
                link: "https://doi.org/10.1109/TSG.2023.12345"
              },
              {
                title: "Novel Framework for Real-time Data Processing in IoT Networks Using Advanced ML Techniques",
                authors: ["Henry E", "Anderson, P.", "Brown, S.", "Davis, M."],
                journal: "Journal of Network and Computer Applications",
                year: "2022",
                doi: "10.1016/j.jnca.2022.54321",
                link: "https://doi.org/10.1016/j.jnca.2022.54321"
              }
            ].map((pub, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl"
              >
                <a 
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition duration-300 hover:opacity-80"
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-400 hover:text-blue-300">
                    {pub.title}
                  </h3>
                </a>
                <div className="text-gray-300 mb-2">
                  {pub.authors.map((author, i) => (
                    <span key={i}>
                      {author === "Henry E" ? (
                        <span className="text-blue-400 font-semibold">{author}</span>
                      ) : (
                        author
                      )}
                      {i < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className="text-gray-400">
                  {pub.journal}, {pub.year}
                </div>
                <div className="text-gray-400">
                  DOI: {pub.doi}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;