import React from "react";
import { Mail, Github, Linkedin, Heart, Code, Instagram } from "lucide-react";
import {SOCIALS} from "../Utill/Socials"; // Importing SOCIALS object


  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname + window.location.search);

    }
  };


export default function Footer() {
  return (
    <footer className="w-full bg-black-900 text-gray-300 py-10 mt-20 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-white tracking-tight">Aviiishk</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Backend & Full‑Stack Developer — Crafting scalable systems,
            clean architectures, and smooth user experiences.
          </p>
          <p className="text-sm italic text-gray-400">“Programs must be written for people to read, and only incidentally for machines to execute.”</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer" onClick={()=>{scrollToSection("home")}}>Home</li>
            <li className="hover:text-white transition-colors cursor-pointer" onClick={()=>{scrollToSection("about")}}>About</li>
            <li className="hover:text-white transition-colors cursor-pointer" onClick={()=>{scrollToSection("education")}}>Education</li>
            <li className="hover:text-white transition-colors cursor-pointer" onClick={()=>{scrollToSection("projects")}}>Projects</li>
            <li className="hover:text-white transition-colors cursor-pointer" onClick={()=>{scrollToSection("contact")}}>Contact</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <div className="flex items-center gap-4">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit GitHub"
              className="hover:text-white transition-colors"
            >
              <Github size={22} />
            </a>

            {/* LinkedIn */}
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit LinkedIn"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={22} />
            </a>

            {/* Instagram (added) */}
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Visit Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram size={22} />
            </a>

            {/* Mail */}
            <a
              href={`mailto:${SOCIALS.email}`}
              aria-label="Send email"
              className="hover:text-white transition-colors"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-1">
          Built with <Code size={16} /> & <Heart size={16} className="text-red-500" /> by Aviiishk
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Aviiishk. All rights reserved.</p>
      </div>
    </footer>
  );
}
