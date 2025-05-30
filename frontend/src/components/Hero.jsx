import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const words = ["simpler", "faster", "organized", "efficient"];
  const fullText = "Manage your tasks with clarity and control";
  const descriptionText = "Our task management app helps you stay on top of clients, deadlines, and daily goals — whether you're freelancing, running a business, or managing a team.";


  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = isDeleting ? 100 : 200;

    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(word.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);

        if (currentCharIndex === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      } else {
        setDisplayText(word.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);

        if (currentCharIndex === word.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [currentCharIndex, currentWordIndex, isDeleting]);


  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative w-full overflow-hidden  min-h-screen flex items-center justify-center px-4 py-20">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-gradient-to-r from-pink-500/20 to-blue-600/20 blur-3xl"
        />
      </div>


      <div className="relative z-10 max-w-6xl mx-auto text-center">

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {fullText.split(" ").map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
              {wordIndex === 3 ? (
                <span className="inline-block min-w-[120px] text-pink-400">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="ml-1 inline-block w-[2px] h-8 bg-white"
                  />
                </span>
              ) : (
                <motion.span 
                  initial="hidden"
                  animate="visible"
                  variants={headingVariants}
                  className="inline-block mr-2"
                >
                  {word.split("").map((char, charIndex) => (
                    <motion.span key={charIndex} variants={charVariants}>
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </motion.h1>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10"
        >
          {descriptionText}
        </motion.p>


        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={()=>navigate("/login")} className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300">
            Login
          </button >
          <button onClick={()=>navigate("/about")} className="px-8 py-3 rounded-lg bg-white/10 text-white font-medium backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce w-8 h-8 border-4 border-white/30 rounded-full" />
      </motion.div>
    </section>
  );
}