import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const tickingRef = useRef(false);

  const getLinkClass = (name) =>
    active === name ? "active-nav-link" : "";

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    const scrollHandler = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          let bestId = active;
          let bestVisible = 0;

          const vh = window.innerHeight;

          sections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            const visible = Math.max(
              0,
              Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
            );
            if (visible > bestVisible) {
              bestVisible = visible;
              bestId = sec.id;
            }
          });

          if (bestId !== active) setActive(bestId);
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("resize", scrollHandler);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", scrollHandler);
    };
  }, [active]);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* LOGO */}
      <motion.a
        href="#home"
        className="
          text-xl 
          md:text-2xl 
          font-bold 
          tracking-wide 
          bg-gradient-to-r from-cyan-300 to-purple-400 
          bg-clip-text 
          text-transparent 
          drop-shadow-[0_0_8px_rgba(147,51,234,0.4)]
          select-none cursor-pointer
        "
        whileHover={{
          scale: 1.15,
          rotate: [-3, 3, -3, 2, -1, 0],
          filter: "drop-shadow(0 0 10px rgba(168,85,247,0.8))",
          transition: { duration: 0.45, ease: "easeInOut" },
        }}
        whileTap={{ scale: 0.9 }}
      >
        Astrofolio
      </motion.a>

      {/* NAV LINKS */}
      <motion.ul
        className="nav-links"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.li variants={fadeInUp}>
          <a href="#home" className={getLinkClass("home")}>
            Home
          </a>
        </motion.li>

        <motion.li variants={fadeInUp}>
          <a href="#projects" className={getLinkClass("projects")}>
            Projects
          </a>
        </motion.li>

        <motion.li variants={fadeInUp}>
          <a href="#contact" className={getLinkClass("contact")}>
            Contact
          </a>
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};
