"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

const StickyScroll = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();

  // Detect which content is active based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = 1 / content.length;
    const index = Math.min(
      content.length - 1,
      Math.floor(latest / step)
    );
    setActiveIndex(index);
  });

  // Background gradients per card
  const gradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan -> emerald
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink -> indigo
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange -> yellow
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // repeat first gradient for 4th card
  ];

  return (
    <motion.div
      className="relative flex min-h-screen justify-center space-x-12 px-8 pt-24 pb-10"
      style={{
        background: gradients[activeIndex % gradients.length],
      }}
      transition={{ type: "spring", stiffness: 90, damping: 25 }}
    >
      {/* Left side content */}
      <div className="max-w-2xl">
        {content.map((item, idx) => (
          <div
            key={item.title + idx}
            className="my-32 min-h-[50vh]"
          >
            <motion.h2
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeIndex === idx ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold text-white"
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeIndex === idx ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className="mt-6 max-w-sm text-white/80"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>


      <motion.aside
        className="sticky top-24 hidden lg:flex h-[320px] w-[320px] rounded-lg shadow-lg text-white font-semibold text-2xl items-center justify-center p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: gradients[activeIndex % gradients.length],
        }}
      >
        {content[activeIndex]?.content}
      </motion.aside>
    </motion.div>
  );
};

export default StickyScroll;
