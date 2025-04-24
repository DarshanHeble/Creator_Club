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
        className="flex flex-col relative left-[9rem] max-xl:left-[6rem] max-lg:left-[5rem] max-md:left-[3rem] max-sm:left-[2rem] py-[8rem] w-[62rem] gap-3 z-30 pointer-events-none "
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.3, delayChildren: 0.5 }}
      >
        <motion.h1
          className="pointer-events-none select-none font-extrabold text-8xl max-lg:text-7xl max-md:text-4xl max-sm:text-2xl"
          variants={contentVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Welcome to Creator Club
        </motion.h1>
        <motion.p
          className="pointer-events-none select-none"
          variants={contentVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          A platform for creators to connect and collaborate
        </motion.p>
        <motion.div
          variants={contentVariants}
          transition={{ duration: 1, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <Button size={"4"} radius="full" className="">
            Get started
            <FaArrowRight />
          </Button>
        </motion.div>
      </motion.div>
      <div className="h-[93vh] w-full relative max-md:absolute overflow-hidden">
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
        <div className="w-[12rem] h-[4rem] fixed z-20 left-[87vw] top-[88.5vh] bg-white dark:bg-[#121113]"></div>
      </div>
    </div>
  );
}
