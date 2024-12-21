import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleNavClick = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      setIsOpen(false); // 关闭菜单
      const navHeight = 80; // 导航栏的高度，根据实际情况调整
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // 创建不同的变换效果
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* 导航栏 */}
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
            <motion.div className="hidden md:flex space-x-8">
              <a onClick={() => handleNavClick('about')} className="hover:text-blue-400 transition duration-300 cursor-pointer">About</a>
              <a onClick={() => handleNavClick('experience')} className="hover:text-blue-400 transition duration-300 cursor-pointer">Experience</a>
              <a onClick={() => handleNavClick('skills')} className="hover:text-blue-400 transition duration-300 cursor-pointer">Skills</a>
              <a onClick={() => handleNavClick('projects')} className="hover:text-blue-400 transition duration-300 cursor-pointer">Projects</a>
              <a onClick={() => handleNavClick('education')} className="hover:text-blue-400 transition duration-300 cursor-pointer">Education</a>
            </motion.div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden relative">
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              height: isOpen ? 'auto' : 0
            }}
            className="md:hidden overflow-hidden absolute right-0 w-48 mt-2 py-2 bg-black/95 backdrop-blur-lg rounded shadow-xl z-50"
            style={{ top: '100%', right: '1rem' }}
          >
            <div className="py-2">
              <a onClick={() => handleNavClick('about')} className="block px-4 py-2 hover:text-blue-400 transition duration-300 cursor-pointer">About</a>
              <a onClick={() => handleNavClick('experience')} className="block px-4 py-2 hover:text-blue-400 transition duration-300 cursor-pointer">Experience</a>
              <a onClick={() => handleNavClick('skills')} className="block px-4 py-2 hover:text-blue-400 transition duration-300 cursor-pointer">Skills</a>
              <a onClick={() => handleNavClick('projects')} className="block px-4 py-2 hover:text-blue-400 transition duration-300 cursor-pointer">Projects</a>
              <a onClick={() => handleNavClick('education')} className="block px-4 py-2 hover:text-blue-400 transition duration-300 cursor-pointer">Education</a>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-8"
        >
          <div className="text-center">
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
              className="text-lg md:text-2xl text-gray-300 mb-4"
            >
              Ph.D. in Software and Intelligent Systems
            </motion.h2>
            <motion.div 
              className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-6 text-sm md:text-base text-gray-400"
            >
              <a href="mailto:crocodilehy@gmail.com">crocodilehy@gmail.com</a>
              <a href="tel:+17807161955">+1 (780) 716 1955</a>
              <span>Edmonton, AB, Canada, T6J 1M3</span>
              <a href="https://www.linkedin.com/in/Henry--E/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
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
            <p className="text-xl text-gray-300 leading-relaxed text-justify">
              Software engineer with research background in machine learning and data processing. 
              Experience in both backend development and ML model deployment. 
              Demonstrated ability to improve system performance and implement automated testing solutions.
            </p>
          </motion.div>
        </motion.div>
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
                items: ["MySQL"]
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
                    <li key={i} className="text-gray-300">• {point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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
                    <li key={i} className="text-gray-300">• {point}</li>
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
                focus: "Research Focus: Machine Learning Applications and Data Processing"
              },
              {
                title: "Bachelor's degree (Mechanical Engineering)",
                school: "Xidian University",
                period: "Sep. 2011 to Aug. 2015",
                focus: ""
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
                {edu.focus && <div className="text-gray-300">{edu.focus}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;