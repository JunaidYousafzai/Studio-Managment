"use client";
import React from "react";
import { motion, useInView } from "framer-motion";

const sections = [
  {
    title: "Seamless Task Collaboration",
    description: "Collaborate effortlessly with your team and clients. Assign tasks, share updates, and communicate in real time — all within a single platform designed to keep everyone aligned and productive.",
    icon: "🤝",
    color: "bg-indigo-900/20"
  },
  {
    title: "Real-Time Progress Tracking",
    description: "Stay updated with live task progress and deadlines. Monitor changes instantly, reduce bottlenecks, and keep your projects on schedule with transparent, real-time updates accessible to all stakeholders.",
    icon: "📊",
    color: "bg-blue-900/20"
  },
  {
    title: "Smart Version Control",
    description: "Never worry about losing your work or mixing up versions. Our smart version control keeps every task update safe and organized, so your team can focus on getting things done without interruption.",
    icon: "🔄",
    color: "bg-emerald-900/20"
  },
  {
    title: "Automated Task Reminders",
    description: "Avoid missed deadlines with automated reminders and notifications. Stay on top of your daily goals and upcoming tasks, so nothing falls through the cracks — all without lifting a finger.",
    icon: "⏰",
    color: "bg-amber-900/20"
  },
];

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="mb-12"
    >
      {children}
    </motion.div>
  );
};
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-8 py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto">

        <FadeInSection>
          <div className="text-center mb-16 md:mb-24">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Our Vision
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              We're redefining productivity through intuitive design and powerful collaboration tools.
            </motion.p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map(({ title, description, icon, color }, idx) => (
            <FadeInSection key={idx} delay={idx * 0.1}>
              <motion.div 
                whileHover={{ y: -5 }}
                className={`rounded-2xl p-8 ${color} backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-gray-800/50`}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h2>
                <p className="text-gray-300 leading-relaxed">{description}</p>
              </motion.div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <div className="mt-24 bg-gray-900/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-800/50">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
              Our Mission
            </h2>
            <motion.p 
              className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              To empower teams and individuals to work smarter, not harder, by creating intuitive tools that streamline collaboration, enhance productivity, and bring clarity to complex workflows. We believe technology should adapt to how people work, not the other way around.
            </motion.p>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}