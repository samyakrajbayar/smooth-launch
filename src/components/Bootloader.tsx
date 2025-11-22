import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BootloaderProps {
  onComplete: () => void;
}

export const Bootloader = ({ onComplete }: BootloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative h-24 w-24"
        >
          <div className="absolute inset-0 rounded-full border-4 border-secondary"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent glow"></div>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold glow-text">Projectile Simulator</h2>
          <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}% Loaded</p>
        </div>
      </div>
    </motion.div>
  );
};
