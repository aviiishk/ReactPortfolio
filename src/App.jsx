import React from "react";
import Header from "./comopnents/Header";
import Home from "./comopnents/Home";
import About from "./comopnents/About";
import { Route, Routes } from "react-router-dom";
import MovingBanner from "./comopnents/MovingBanner";
import Education from "./comopnents/Education";
import Skills from "./comopnents/TechStack";
import TechStack from "./comopnents/TechStack";
import Footer from "./comopnents/Footer";
import Projects from "./comopnents/Projects";
import Contact from "./comopnents/Contact";
import Cursor from "./comopnents/Cursor";

const App = () => {
  return (
    <div className="bg-black text-white scroll-smooth">
      <Cursor />
      <Header />

      {/* Each section gets an ID to enable smooth scrolling */}
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>
      <MovingBanner
        speed={18}
        pauseOnHover={false}
      />
      <section id="education">
        <Education />
      </section>
      <TechStack />
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact  />
      </section>
      <Footer />
    </div>
  );
};

export default App;
