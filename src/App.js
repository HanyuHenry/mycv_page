import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="bg-black text-white">
      {/* 固定的导航栏 */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-sm z-50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            Hanyu
          </motion.span>
          <div className="space-x-8">
            <a href="#about" className="hover:text-gray-300 transition-colors duration-300">About</a>
            <a href="#skills" className="hover:text-gray-300 transition-colors duration-300">Skills</a>
            <a href="#projects" className="hover:text-gray-300 transition-colors duration-300">Projects</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple 风格的大标题 */}
      <section className="h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
            Hanyu
          </h1>
          <p className="text-2xl text-gray-400">Creating Digital Experiences</p>
        </motion.div>
      </section>

      {/* 关于我 - 带视差效果 */}
      <section className="min-h-screen relative py-32 overflow-hidden" id="about">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto px-8"
        >
          <motion.h2 
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            className="text-6xl font-bold mb-16"
          >
            About Me
          </motion.h2>
          <div className="grid grid-cols-2 gap-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm a passionate developer focused on creating beautiful and functional web experiences.
                My journey in tech started with curiosity and grew into expertise.
              </p>
              {/* 可以继续添加更多段落 */}
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8"
            >
              {/* 这里可以放技能统计或者其他信息 */}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 技能展示部分 - 动态卡片 */}
      <section className="min-h-screen py-32 bg-gradient-to-b from-black via-gray-900 to-black" id="skills">
        <div className="max-w-6xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl font-bold mb-16 text-center"
          >
            Skills & Expertise
          </motion.h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { title: "Frontend", items: ["React", "Vue", "TypeScript"] },
              { title: "Backend", items: ["Node.js", "Python", "Databases"] },
              { title: "Tools", items: ["Git", "Docker", "AWS"] }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map(item => (
                    <li key={item} className="text-gray-400">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 项目展示 - 滚动渐变效果 */}
      <section className="min-h-screen py-32" id="projects">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto px-8"
        >
          <h2 className="text-6xl font-bold mb-16">Projects</h2>
          {/* 这里可以添加项目卡片 */}
        </motion.div>
      </section>
    </div>
  );
}

export default App;