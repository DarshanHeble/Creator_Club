import React from "react";
import { motion } from "framer-motion";

const Loader: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent text-white">
      {/* Bouncing Balls Animation */}
      <div className="mt-8 flex items-center gap-4">
        {[1, 2, 3, 4].map((ball) => (
          <motion.div
            key={ball}
            className="h-6 w-6 rounded-full bg-black dark:bg-white"
            initial={{ y: 0 }}
            animate={{ y: [-20, 20, -20] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: ball * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
