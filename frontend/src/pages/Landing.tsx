import { Button } from "@radix-ui/themes";
import { Suspense, lazy, memo, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

// Lazy load and memoize the Spline component
const LazySpline = memo(lazy(() => import("@splinetool/react-spline")));

export function Landing() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-around relative">
      <motion.div
        className="flex flex-col relative left-[10rem] py-[10rem] w-[60rem] gap-3"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.3, delayChildren: 0.5 }}
      >
        <motion.h1
          className="pointer-none select-none font-extrabold text-8xl"
          variants={contentVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to Creator Club
        </motion.h1>
        <motion.p
          className="pointer-none select-none"
          variants={contentVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          A platform for creators to connect and collaborate
        </motion.p>
        <motion.div
          variants={contentVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Button size={"4"} radius="full" className="">
            Get started
            <FaArrowRight />
          </Button>
        </motion.div>
      </motion.div>
      <div className="h-[93vh] w-full relative overflow-hidden">
        <Suspense>
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={isSplineLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <LazySpline
              scene="https://prod.spline.design/0tinqLr4b8UmLGHR/scene.splinecode"
              onLoad={() => setIsSplineLoaded(true)} // Trigger animation after loading
            />
          </motion.div>
        </Suspense>
        <div className="w-[12rem] h-[4rem] fixed z-50 left-[87vw] top-[88.5vh] bg-white dark:bg-[#121113]"></div>
      </div>
    </div>
  );
}
