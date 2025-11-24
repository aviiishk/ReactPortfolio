import React from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiJquery,
  SiBootstrap,
  SiTailwindcss,
  SiVite,
  SiSpring,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiDocker,
  SiFigma,
  SiGithub,
  SiPostman,
  SiArduino,
} from "react-icons/si";

export default function TechStack() {
  const sections = [
    {
      title: "Frontend",
      items: [
        { icon: <SiHtml5 />, label: "HTML" },
        { icon: <SiCss3 />, label: "CSS" },
        { icon: <SiSass />, label: "SCSS" },
        { icon: <SiJavascript />, label: "JavaScript" },
        { icon: <SiTypescript />, label: "TypeScript" },
        { icon: <SiReact />, label: "React" },
        { icon: <SiAngular />, label: "Angular" },
        { icon: <SiJquery />, label: "jQuery" },
        { icon: <SiBootstrap />, label: "Bootstrap" },
        { icon: <SiTailwindcss />, label: "Tailwind CSS" },
        { icon: <SiVite />, label: "Vite.js" },
      ],
    },
    {
      title: "Backend",
      items: [
        { icon: <SiSpring />, label: "Spring Boot" },
        { icon: <SiNodedotjs />, label: "Node.js" },
        { icon: <SiExpress />, label: "Express.js" },
      ],
    },
    {
      title: "Database",
      items: [
        { icon: <SiMongodb />, label: "MongoDB" },
        { icon: <SiMysql />, label: "MySQL" },
        { icon: <SiSqlite />, label: "SQLite" },
      ],
    },
    {
      title: "Others",
      items: [
        { icon: <SiDocker />, label: "Docker" },
        { icon: <SiFigma />, label: "Figma" },
        { icon: <SiGithub />, label: "GitHub" },
        { icon: <SiPostman />, label: "Postman" },
        { icon: <SiArduino />, label: "Arduino" },
      ],
    },
  ];

  return (
    <div className="flex items-center justify-center bg-linear-to-b from-[#081226] via-[#0b0f1a] to-[#0b1220] p-8 text-white">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-purple-400">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 3v18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="text-3xl font-bold tracking-wide">Tech Stack</h1>
          </div>
        </div>

        {/* Outer grid: base = 1 col (small), lg = 2 cols */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sections.slice(0, 2).map((section) => (
            <motion.section
              key={section.title}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#0f1724]/60 rounded-2xl p-6 shadow-lg border border-transparent hover:border-blue-400 transition-all duration-200 origin-center transform-gpu"
            >
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>

              {/* Inner grid: base=3, md=4, lg=6 */}
              <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
                {section.items.map((it) => (
                  <motion.div
                    key={it.label}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    {/* responsive icon wrapper sizes */}
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl md:text-[1.45rem]">
                      {it.icon}
                    </div>
                    <span className="text-[10px] md:text-[11px] text-center">
                      {it.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}

          {sections.slice(2).map((section) => (
            <motion.section
              key={section.title}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#0f1724]/60 rounded-2xl p-6 shadow-lg border border-transparent hover:border-blue-400/40 transition-all duration-200 origin-center transform-gpu"
            >
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>

              <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
                {section.items.map((it) => (
                  <motion.div
                    key={it.label}
                    whileHover={{ scale: 1.15 }}
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-2xl md:text-[1.45rem]">
                      {it.icon}
                    </div>
                    <span className="text-[10px] md:text-[11px] text-center">
                      {it.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
