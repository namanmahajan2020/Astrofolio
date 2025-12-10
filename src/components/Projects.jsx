import { motion } from "framer-motion";

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

export const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{ backgroundImage: "url('/projects/ff.png')" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          />
          <h3> Feeding Futures</h3>
          <p>
            A Zero-Hunger initiative app that manages leftover food from messes,
            offices, and events, while coordinating NGOs to distribute food to
            people in need. Includes donation workflow and analytics.
          </p>
          <div className="project-tech">
            <span>Node.js</span>
            <span>JavaScript</span>
            <span>React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
            <span>TailwindCSS</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/famazon.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Famazon</h3>
          <p>
            An e-commerce platform that helps small shopkeepers
             replace WhatsApp status selling with a proper online store,
              offering product browsing, secure checkout, and an admin panel to
               manage orders and shop details with ease.
          </p>
          <div className="project-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>JavaScript</span>
            <span>Express</span>
            <span>TailwindCSS</span>
            <span>Razorpay</span>
            <span>MongoDB</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/buyme.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Buy Me A Chai</h3>
          <p>
            A creator support platform where users can send small payments via Razorpay, 
            leave messages, and see top supporters highlighted on the page, all in a clean 
            and simple interface.

          </p>
          <div className="project-tech">
            <span>Next.js</span>
            <span>React</span>
            <span>JavaScript</span>
            <span>MongoDB</span>
            <span>TailwindCSS</span>
            <span>Razorpay</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};