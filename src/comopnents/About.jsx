import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative w-full min-h-screen bg-[#0c0b11] text-white px-8 md:px-20 py-24 flex flex-col md:flex-row items-center gap-50">
      {/* Left Content */}
      <div className="flex-1 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-semibold text-purple-400 flex items-center gap-3">
          <span className="text-purple-400 text-5xl">👤</span> WHO I AM?
        </h2>

        <p className="lg:text-lg sm:text-xs  leading-relaxed mt-8 text-gray-300">
          My name is Abhishek, a dedicated and goal-driven{" "}
          <span className="text-purple-300 font-semibold">
            Full Stack Developer{` `}
          </span>
          focused on <span className="text-purple-300 font-semibold"> Java Backend (Spring Boot)</span> and <span className="text-purple-300 font-semibold">React Frontend development.</span>
          I’ve built several real-world projects that have strengthened my
          understanding of both client-side and server-side development.
        </p>

        <p className="lg:text-lg sm:text-xs leading-relaxed mt-4 text-gray-300">
          I take pride in writing clean, reliable code and building applications
          that deliver smooth user experiences. I learn quickly, adapt fast, and
          enjoy solving technical challenges with a practical and structured
          approach.
        </p>

        <p className="lg:text-lg sm:text-xs leading-relaxed mt-4 text-gray-300">
          I believe in continuous learning and staying updated with modern tools
          and development trends. When I'm not coding, I enjoy exploring new
          technologies and occasionally gaming to stay creative and refreshed.
        </p>

        <p className="lg:text-lg sm:text-xs leading-relaxed mt-4 text-gray-300">
          My goal is to grow as a professional full stack engineer, contribute
          to impactful projects, and keep expanding my technical expertise.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-8">
          <div>
            <h3 className="lg:text-4xl md:text-3xl sm:text-2xl text-purple-400 font-bold">1+</h3>
            <p className="text-gray-400 mt-1">Years of Learning Experience</p>
          </div>
          <div>
            <h3 className="lg:text-4xl md:text-3xl sm:text-2xl text-purple-400 font-bold">10+</h3>
            <p className="text-gray-400 mt-1">Projects Completed</p>
          </div>
          <div>
            <h3 className="lg:text-4xl md:text-3xl sm:text-2xl text-purple-400 font-bold">Focused</h3>
            <p className="text-gray-400 mt-1">Full Stack Path</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative flex justify-center items-center"
      >
        <div className="w-[350px] h-[420px] md:w-[420px] md:h-[500px] bg-blue-200 rounded-3xl relative overflow-hidden shadow-xl">
          <img
            src="/me.png"
            alt="Profile"
            className="absolute bottom-0 w-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
