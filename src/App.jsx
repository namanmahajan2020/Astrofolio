import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { StarBackground } from "./components/StarBackground";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // --------------------------------------------------------
  // ⭐ INITIAL SETUP (emailJS + fade-in state)
  // --------------------------------------------------------
  useEffect(() => {
    setIsLoaded(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // --------------------------------------------------------
  // ⭐ SCROLL-SPY: update URL hash when entering sections
  // --------------------------------------------------------
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            history.replaceState(null, "", `#${id}`);
          }
        });
      },
      { threshold: 0.5 } // triggers when 50% of section is visible
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ⭐ Background stars layer */}
      <StarBackground />

      {/* ⭐ Main App Content */}
      <div className={`app ${isLoaded ? "loaded" : ""}`}>
        
        <Navbar />
        <Hero />
        <Projects />
        <Contact />

        {/* Footer */}
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>© 2025 Naman's Astrofolio - All rights reserved.</p>
        </motion.footer>
      </div>
    </>
  );
}

export default App;
