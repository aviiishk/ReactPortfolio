import React from "react";
// import Navbar from "../components/Navbar"; // optional
// Screenshot reference (local): /mnt/data/3c57ce86-39ab-4d43-a40a-d5aa3e9a32bd.png

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const codeString = `const developer = {
  name: 'Abhishek Kumar Prasad',
  skills: [
    'React', 'Spring Boot',
    'Java', 'SQL',
    'TypeScript', 'Docker'
  ],
  hardworker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    if (problems.exist) {
      return "Let's solve it!";
    } else {
      return "Inventing problems to solve..😅";
    }
  }
};`;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Optional Navbar */}
      {/* <Navbar /> */}

      <section
        className="
          relative w-full
          pl-2 pr-4
          sm:pl-3 sm:pr-6
          md:pl-4 md:pr-8
          lg:pl-6 lg:pr-12
          xl:pl-8 xl:pr-16
          py-16 sm:py-20 lg:py-28
          grid grid-cols-1 lg:grid-cols-12
          gap-y-8 gap-x-12
          items-center
        "
      >
        {/* Left side */}
        <div className="lg:col-span-6">
          {/* open pill */}
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-2 bg-zinc-800/60 text-zinc-200 rounded-full px-3 py-1.5 text-xs sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 block" />
              Open for opportunities
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extralight leading-tight mb-4">
            <div className="text-white">Hello,</div>

            <div className="mt-1 text-2xl sm:text-3xl lg:text-5xl">
              I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-400 font-medium">
                Abhishek Kumar Prasad
              </span>
            </div>

            <div className="mt-2 text-2xl sm:text-3xl lg:text-5xl text-zinc-300">
              Professional{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Software
              </span>
              <br />
              Developer.
            </div>
          </h1>

          <p className="max-w-xl text-zinc-400 mb-6 text-sm sm:text-base">
            Crafting digital experiences through elegant code and intuitive
            design. Specializing in modern web development with a focus on
            performance and user experience.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 bg-gradient-to-r from-cyan-400 to-violet-500 text-black font-medium shadow-md hover:scale-[1.05] transition-transform text-sm"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8.5l9 6 9-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 6.5H3v11h18v-11z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm">Let's Connect</span>
            </a>
          </div>
        </div>

        {/* Right side - code card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-[#212143] rounded-2xl shadow-2xl ring-1 ring-black/40 overflow-hidden">
            {/* faux mac header */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#2C2C59]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            {/* code content */}
            <pre
              className="p-6 sm:p-8 text-xs sm:text-sm leading-snug whitespace-pre-wrap font-mono text-zinc-200"
              style={{ background: "#212143" }}
            >
              <SyntaxHighlighter
                language="javascript"
                style={{
                  ...oneDark, // keep colors
                  'pre[class*="language-"]': { background: "none" },
                  'code[class*="language-"]': { background: "none" },
                  span: { background: "none" },
                }}
                customStyle={{
                  background: "none",
                  padding: 0,
                  margin: 0,
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                }}
                showLineNumbers={false}
              >
                {codeString}
              </SyntaxHighlighter>
            </pre>
          </div>
        </div>
      </section>

      {/* scroll indicator (right) - hide on small screens */}
      <div className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 rotate-90 tracking-wider">
        <div className="text-xs">Scroll</div>
      </div>
    </div>
  );
}
