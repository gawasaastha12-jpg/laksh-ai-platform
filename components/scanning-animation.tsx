"use client";

import { motion } from "framer-motion";
import { FileSearch, Sparkles } from "lucide-react";

export function ScanningAnimation() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Document Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FileSearch className="h-16 w-16 text-muted-foreground" />
          </div>

          {/* Scanning Line */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ top: "10%" }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Spinning Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Sparkles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * 40],
                y: [0, (i < 2 ? -1 : 1) * 40],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Analyzing Your Profile
        </motion.h2>

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Checking eligibility across all government jobs...
        </motion.p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
