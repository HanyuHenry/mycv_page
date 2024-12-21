import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 创建不同的变换效果
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* 导航栏 */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-lg z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold"
          >
            Henry E
          </motion.div>
          <motion.div className="space-x-8">
            <a href="#about" className="hover:text-blue-400 transition duration-300">About</a>
            <a href="#experience" className="hover:text-blue-400 transition duration-300">Experience</a>
            <a href="#skills" className="hover:text-blue-400 transition duration-300">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition duration-300">Projects</a>
            <a href="#education" className="hover:text-blue-400 transition duration-300">Education</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Henry (Hanyu) E
              </span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-300 mb-4"
            >
              Ph.D. in Software and Intelligent Systems
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center space-x-6 text-gray-400"
            >
              <a href="mailto:crocodilehy@gmail.com" className="hover:text-blue-400 transition">
                crocodilehy@gmail.com
              </a>
              <a href="tel:+17807161955" className="hover:text-blue-400 transition">
                +1 (780) 716 1955
              </a>
              <a href="https://scholar.google.com/citations?user=N-Ql578AAAAJ&hl=en" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="hover:text-blue-400 transition"
              >
                Google Scholar
              </a>
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
            <p className="text-xl text-gray-300 leading-relaxed">
              Software engineer with research background in machine learning and data processing. 
              Experience in both backend development and ML model deployment. 
              Demonstrated ability to improve system performance and implement automated testing solutions.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen py-32 bg-gradient-to-b from-black via-blue-900/10 to-black" id="skills">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Technical Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Experience Section */}
      <section className="min-h-screen py-32" id="experience">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-16"
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-12">
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
    </div>
  );
}

export default App;