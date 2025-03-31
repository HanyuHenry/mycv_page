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
        const navHeight = 40;
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
          <div className="flex justify-between items-center relative">  {/* 添加 relative */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold"
            >
              Henry (Hanyu) E
            </motion.div>
            
            {/* Desktop Navigation */}
            <motion.div className="hidden xl:flex space-x-4">
              {navItems.map(item => (
                <NavItem key={item.id} {...item} />
              ))}
            </motion.div>

            {/* Mobile Navigation */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-blue-400 transition duration-300 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              
              {/* Mobile Menu */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-full right-0 mt-2 py-2 bg-black/95 backdrop-blur-lg shadow-xl rounded-lg min-w-[200px]"
                >
                  <div className="flex flex-col">
                    {navItems.map(item => (
                      <NavItem key={item.id} {...item} isMobile={true} />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <section className="min-h-screen relative overflow-hidden pt-24 md:pt-0" id="main">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
        >
          <div className="text-center max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-4 md:mb-6 px-4 md:px-0"
            >
              <span className="bg-clip-text text-transparent animate-gradient bg-[length:400%_auto] bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-green-500 to-blue-500">
                Henry E
              </span>
              <style jsx global>{`
                  @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .animate-gradient {
                    animation: gradient 4s linear infinite;
                  }
                `}</style>
            </motion.h1>

            <motion.h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 md:mb-16 px-4 md:px-0"
            >
              Ph.D. in Software and Intelligent Systems
            </motion.h2>

            {/* Contact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto"
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
                  link: "https://scholar.google.com/citations?user=RQy7f3oAAAAJ&hl=en",
                },
                {
                  icon: "💻",
                  label: "GitHub",
                  value: "See My Code",
                  link: "https://github.com/HanyuHenry",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative group px-2 sm:px-0"
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? "_blank" : undefined}
                      rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="block w-full h-full"
                    >
                      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl p-3 sm:p-4 transition duration-300 transform hover:scale-105 hover:from-blue-900/40 hover:to-purple-900/40 shadow-lg">
                      <div className="text-xl sm:text-2xl mb-2">{item.icon}</div>
                      <div className="text-gray-400 text-xs sm:text-lg">{item.label}</div>
                      <div className="text-white text-sm sm:text-base font-medium truncate">{item.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-xl p-4 shadow-lg">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-gray-400 text-lg">{item.label}</div>
                      <div className="text-white font-medium truncate">{item.value}</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="min-h-screen relative py-24 md:py-32" id="about">
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
      <section className="min-h-screen py-24 md:py-32" id="experience">
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
                company: "University of Alberta, Edmonton, Canada",
                period: "Sep. 2022 - Present",
                points: [
                  "Developed and optimized machine learning models using Python, improving processing speed by 20%",
                  "Implemented automated testing procedures reducing software release cycle time by 30%",
                  "Coordinated with team members to improve development workflow and code quality",
                  "Supervised and mentored graduate students on AI research projects",
                  "Published three papers in peer-reviewed journals on ML applications"
                ]
              },
              {
                title: "Frontend Developer (Part time)",
                company: "Apex Automation     Edmonton, Canada",
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
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-16">
            Publications
          </motion.h2>
          <div className="space-y-12">
            {(() => {
              // 所有的文章数据
              const allPublications = [
              {
                title: "Design of fuzzy rule-based models in heterogeneous data spaces and their stability",
                authors: ["Ye Cui", "Hanyu E", "Witold Pedrycz", "Marek, Sikora", "Zhiwu Li", "Lukasz Wawrowski", "Michal Kozielski"],
                journal: "IEEE Transactions on Knowledge and Data Engineering",
                year: "Under Review",
                status: "Under Review"
              },
              {
                title: "A Novel Neural Network-Based Fuzzy Ranking for Decision Problems in Sustainable Energy",
                authors: ["Ye Cui", "Hanyu E", "Witold Pedrycz","Aminah Robinson Fayek","Simaan Abourizk"],
                journal: "Renewable Energy",
                year: "Under Review",
                status: "Under Review"
              },
              
              {
                title: "From Fuzzy Rule-Based Models to Granular Models",
                authors: ["Ye Cui", "Hanyu E", "Witold Pedrycz", "Aminah Robinson Fayek", "Zhiwu Li", "Xianmin Wang"],
                journal: "IEEE Transactions on Fuzzy Systems",
                year: "2024",
                doi: "10.1109/TFUZZ.2024.3483817",
                link: "https://ieeexplore.ieee.org/abstract/document/10738440"
              },
              {
                title: "Strategies for Designing Machine Learning Models in Renewable Energy with Insufficient Data",
                authors: ["Hanyu E", "Ye Cui", "Witold Pedrycz", "Aminah Robinson Fayek", "Simaan AbouRizk"],
                journal: "Energy",
                year: "2024",
                pages: "133475",
                note: "1*",
                doi: "10.1016/j.energy.2023.133475",
                link: "https://doi.org/10.1016/j.energy.2024.133475"
              },
              {
                title: "Constructing Perturbation Matrices of Prototypes for Enhancing the Performance of Fuzzy Decoding Mechanism",
                authors: ["Kaijie Xu", "Hanyu E", "Junliang Liu", "Guoyao Xiao", "Xianan Tang", "Mengdao Xing"],
                journal: "International Journal of Intelligent Systems",
                year: "2024", 
                note: "2",
                doi: "10.1155/2024/5780186",
                link: "https://doi.org/10.1109/TAES.2022.3144121"
              },
              {
                title: "Continuous Mapping of Covering Approximation Spaces and Topologies Induced by Arbitrary Covering Relations", 
                authors: ["Xiao Shang", "Pei Wang", "Ronghuo Wu", "Hanyu E"],
                journal: "Symmetry",
                volume: "15",
                number: "10",
                pages: "1808",
                year: "2023",
                doi: "10.3390/sym15101808",
                link: "https://doi.org/10.3390/sym15101808"
              },
              {
                title: "Language recovery in discrete-event systems against sensor deception attacks",
                authors: ["Abdeldjalil Labed", "Ikram Saadaoui", "Hanyu E", "Mohammed A. El-Meligy", "Zhiwu Li", "Mohamed Sharaf"],
                journal: "Mathematics",
                volume: "11",
                number: "10", 
                pages: "2313",
                year: "2023",
                note: "2",
                doi: "10.3390/math11102313",
                link: "https://doi.org/10.3390/math11102313"
              },
              {
                title: "Modeling of Fault Recovery and Repair for Automated Manufacturing Cells with Load-Sharing Redundant Elements Using Petri Nets",
                authors: ["Ebrahim A. Alzalab", "Umar Suleiman Abubakar", "Hanyu E", "Zhiwu Li", "Mohammed A. El-Meligy", "Ahmed M. El-Sherbeeny"], 
                journal: "Processes",
                volume: "11",
                number: "5",
                pages: "1501",
                year: "2023",
                doi: "10.3390/pr11051501",
                link: "https://doi.org/10.3390/pr11051501"
              },
              {
                title: "Design of Distributed Rule-Based Models in the Presence of Large Data",
                authors: ["Hanyu E", "Ye Cui", "Witold Pedrycz", "Zhiwu Li"],
                journal: "IEEE Transactions on Fuzzy Systems",
                year: "2022", 
                note: "18*",
                doi: "10.1109/TFUZZ.2022.3226250",
                link: "https://doi.org/10.1109/TFUZZ.2022.3226250"
              },
              {
                title: "A granular multicriteria group decision making for renewable energy planning problems",
                authors: ["Ye Cui", "Hanyu E", "Witold Pedrycz", "Aminah Robinson Fayek"],
                journal: "Renewable Energy",
                year: "2022",
                note: "9",
                doi: "10.1016/j.renene.2022.09.051",
                link: "https://doi.org/10.1016/j.renene.2022.09.051"
              },
              {
                title: "Design of Fuzzy Rule-Based Models with Fuzzy Relational Factorization",
                authors: ["Hanyu E", "Ye Cui", "Witold Pedrycz", "Aminah Robinson Fayek", "Zhiwu Li", "Jinbo Li"],
                journal: "Expert Systems with Applications",
                pages: "117904",
                year: "2022", 
                note: "14*",
                doi: "10.1016/j.eswa.2022.117904",
                link: "https://doi.org/10.1016/j.eswa.2022.117904"
              },
              {
                title: "High-accuracy DOA Estimation Algorithm at Low SNR Through Exploiting a Supervised Index",
                authors: ["Kaijie Xu", "Mengdao Xing", "Rui Zhang", "Hanyu E", "Minghui Sha", "Weike Nie", "Yinghui Quan"],
                journal: "IEEE Transactions on Aerospace and Electronic Systems",
                year: "2022",
                note: "20",
                doi: "10.1109/TAES.2022.3144121",
                link: "https://doi.org/10.1109/TAES.2022.3144121" 
              },
              {
                title: "Fuzzy Rule-Based Models of High-Dimensional Systems: Design and Analysis",
                authors: ["Hanyu E"],
                journal: "University of Alberta",
                year: "2022",
                doi: "https://doi.org/10.7939/r3-37gb-c830",
                link: "https://era.library.ualberta.ca/items/9f016716-954f-442a-bb56-ecc539936171"
              },
              {
                title: "High-Dimensional Data Clustering with Fuzzy C-Means: Problem, Reason, and Solution",
                authors: ["Yinghua Shen", "Hanyu E", "Tianhua Chen", "Zhi Xiao", "Bingsheng Liu", "Yuan Chen"],
                journal: "International Work-Conference on Artificial Neural Networks",
                pages: "89-100",
                year: "2021",
                note: "3",
                doi: "10.1007/978-3-030-85030-2_8",
                link: "https://doi.org/10.1007/978-3-030-85030-2_8"
              },
              {
                title: "Fast Direction of Arrival Estimation for Uniform Circular Arrays With a Virtual Signal Subspace",
                authors: ["Kaijie Xu", "Yinghui Quan", "Bowen Bie", "Mengdao Xing", "Weike Nie", "Hanyu E"],
                journal: "IEEE Transactions on Aerospace and Electronic Systems", 
                volume: "57",
                number: "3",
                pages: "1731-1741",
                year: "2021",
                note: "24",
                doi: "10.1109/TAES.2021.3050667",
                link: "https://doi.org/10.1109/TAES.2021.3050667"
              },
              {
                title: "From granulation-degranulation mechanisms to fuzzy rule-based models: Augmentation of granular-based models with a double fuzzy clustering",
                authors: ["Kaijie Xu", "Hanyu E", "Yinghui Quan", "Ye Cui", "Weike Nie"], 
                journal: "Journal of Intelligent & Fuzzy Systems",
                pages: "1-10",
                year: "2021",
                note: "4",
                doi: "10.3233/JIFS-210336",
                link: "https://doi.org/10.3233/JIFS-210336"
              },
              {
                title: "Fuzzy Relational Matrix Factorization and Its Granular Characterization in Data Description",
                authors: ["Hanyu E", "Ye Cui", "Witold Pedrycz", "Zhiwu Li"],
                journal: "IEEE Transactions on Fuzzy Systems",
                year: "2020",
                note: "11*",
                doi: "10.1109/TFUZZ.2020.3048577",
                link: "https://doi.org/10.1109/TFUZZ.2020.3048577"
              }, 
              {
                title: "Designing distributed fuzzy rule-based models",
                authors: ["Ye Cui", "Hanyu E", "Witold Pedrycz", "Zhiwu Li"],
                journal: "IEEE Transactions on Fuzzy Systems",
                volume: "29",
                number: "7",
                pages: "2047-2053", 
                year: "2020",
                note: "26",
                doi: "10.1109/TFUZZ.2020.2984971",
                link: "https://doi.org/10.1109/TFUZZ.2020.2984971"
              },
              {
                title: "Augmentation of rule-based models with a granular quantification of results",
                authors: ["Ye Cui", "Hanyu E", "Witold Pedrycz", "Zhiwu Li"],
                journal: "Soft Computing",
                volume: "23",
                number: "23", 
                pages: "12745-12759",
                year: "2019",
                note: "11",
                doi: "10.1007/s00500-019-03825-7", 
                link: "https://doi.org/10.1007/s00500-019-03825-7"
              },
              {
                title: "Enhancements of rule-based models through refinements of Fuzzy C-Means",
                authors: ["Hanyu E", "Ye Cui", "Witold Pedrycz", "Zhiwu Li"],
                journal: "Knowledge-Based Systems",
                volume: "170",
                pages: "43-60",
                year: "2019",
                doi: "10.1016/j.knosys.2019.01.027",
                link: "https://doi.org/10.1016/j.knosys.2019.01.027"
              }
            ];
            // 计算总文章数，用于倒序编号
            const totalPubs = allPublications.length;
            let currentCount = totalPubs + 1;

            // 按年份分组
            const groupedPubs = allPublications.reduce((acc, pub) => {
              if (!acc[pub.year]) acc[pub.year] = [];
              acc[pub.year].push(pub);
              return acc;
            }, {});

            return Object.entries(groupedPubs)
            .sort(([yearA], [yearB]) => {
              if (yearA === "Under Review") return -1;
              if (yearB === "Under Review") return 1;
              return Number(yearB) - Number(yearA);
            })
            .map(([year, publications]) => (
              <div key={year} className="space-y-6">
                <motion.h3
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="text-2xl font-bold text-blue-400 border-b border-blue-400/30 pb-2"
                >
                  {year}
                </motion.h3>
                {publications.map((pub) => {
                  currentCount -= 1;
                  return (
                      <div key={pub.title} className="relative flex items-start gap-8">
                        <div className="hidden md:block -mt-4">
                          <span className="text-[130px] text-blue-400/60 select-none" 
                                style={{ 
                                  fontFamily: 'Varela Round, "Comic Sans MS", sans-serif',
                                  fontWeight: '800',
                                  letterSpacing: '-2px',
                                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                                }}>
                            {String(currentCount).padStart(2, '0')}
                          </span>
                        </div>
                        <motion.div className="flex-1 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                        {/* 标题部分，根据是否有link来决定是否可点击 */}
                        {pub.link ? (
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
                        ) : (
                          <h3 className="text-xl font-bold mb-4 text-blue-400">
                            {pub.title}
                          </h3>
                        )}             
                        {/* 作者部分 */}
                        <div className="text-gray-300 mb-2">
                          {pub.authors.map((author, i) => (
                            <span key={i}>
                              {author === "Hanyu E" ? (
                                <span className="text-blue-400 font-semibold">{author}</span>
                              ) : (
                                author
                              )}
                              {i < pub.authors.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>

                        {/* 期刊和状态部分 */}
                        <div className="space-y-1">
                          <div className="text-gray-400">
                            {pub.journal}
                          </div>
                          {pub.status ? (
                            <div className="text-gray-400 text-sm">
                              {pub.status}
                            </div>
                          ) : (
                            <>
                              <div className="text-gray-400">
                                {pub.year}
                              </div>
                              <div className="text-gray-400">
                                DOI: {pub.doi}
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            ));
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;