import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, BellIcon, ChartBarIcon, SparklesIcon } from "@heroicons/react/24/outline";

const features = [
  {
    title: "Organize Your Tasks",
    description:
      "Add, update, and manage your tasks to keep everything under control.",
    icon: <CheckCircleIcon className="h-12 w-12 text-indigo-500 group-hover:text-indigo-700" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your daily accomplishments and stay motivated with progress tracking.",
    icon: <ChartBarIcon className="h-12 w-12 text-green-500 group-hover:text-green-700" />,
  },
  {
    title: "Stay Notified",
    description:
      "Enable smart reminders and push notifications to never miss important deadlines.",
    icon: <BellIcon className="h-12 w-12 text-yellow-500 group-hover:text-yellow-700" />,
  },
  {
    title: "Beautiful Interface",
    description:
      "Experience a delightful UI designed for minimal distraction and maximum productivity.",
    icon: <SparklesIcon className="h-12 w-12 text-pink-500 group-hover:text-pink-700" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map(({ title, description, icon }, i) => (
          <motion.div
            key={title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="relative group bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl    hover:border-pink-600 "
          >
            <div className="absolute inset-0   opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300 z-0"></div>
            
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4 animate-float">{icon}</div>
              <h3 className="text-xl font-semibold text-white group-hover:text-black text-center mb-2 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-300 group-hover:text-gray-800 text-sm text-center transition-colors duration-300">
                {description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}