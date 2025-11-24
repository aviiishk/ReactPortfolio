import React from "react";
import { Calendar, MapPin, GraduationCap } from "lucide-react";

const educationData = [
  {
    id: 1,
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Gauhati  University",
    location: "Assam, India",
    date: "2022-2025 Present",
    description: "Focused on software development and computer science.",
  },
];

export default function Education() {
  return (
    <section className="relative py-12 px-5 sm:px-8 md:px-12 lg:px-20 bg-gradient-to-b from-black via-[#060606] to-[#05050a] text-white">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-3 mb-8">
          <h2 className="flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-light text-purple-400">
            <span className="text-2xl sm:text-3xl">🎓</span>
            <span>Education</span>
          </h2>
        </header>

        {/* timeline container */}
        <div className="relative">
          {/* vertical line for md+ screens */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-cyan-900/20" aria-hidden />

          <div className="space-y-8 md:space-y-6">
            {educationData.map((item, idx) => (
              <article
                key={item.id}
                className="relative hover:border-blue-400 bg-[#061014]/60 border border-[#0b2a2a]/30 rounded-2xl p-6 sm:p-8 md:p-6 lg:p-8 shadow-lg overflow-visible"
              >
                <div className="md:grid md:grid-cols-12 md:items-start gap-4">
                  {/* timeline marker for md+ */}
                  <div className="hidden md:flex md:col-span-1 justify-center">
                    <div className="relative w-0">
                      <span className="absolute -left-6 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400/90 ring-4 ring-black">
                        {/* small dot */}
                        <span className="sr-only">Timeline point</span>
                      </span>
                    </div>
                  </div>

                  {/* main content */}
                  <div className="md:col-span-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-100">
                          {item.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-cyan-200/80 mt-2">
                          <span className="inline-flex items-center gap-2">
                            <GraduationCap size={16} />
                            <span className="truncate">{item.institution}</span>
                          </span>

                          <span className="hidden sm:inline text-cyan-200/60">•</span>

                          <span className="inline-flex items-center gap-2">
                            <MapPin size={16} />
                            <span className="truncate">{item.location}</span>
                          </span>
                        </div>

                        <p className="mt-3 text-sm sm:text-base text-gray-300/85">
                          {item.description}
                        </p>
                      </div>

                      {/* date for small screens (shown under title on xs/sm) */}
                      <div className="block sm:hidden mt-3">
                        <div className="inline-flex items-center gap-2 text-cyan-300">
                          <Calendar size={16} />
                          <span className="text-sm text-cyan-200/90">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* date column for md+ */}
                  <div className="hidden md:flex md:col-span-3 md:justify-end md:items-start">
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 text-cyan-300">
                        <Calendar size={18} />
                        <span className="text-sm text-cyan-200/90">{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
