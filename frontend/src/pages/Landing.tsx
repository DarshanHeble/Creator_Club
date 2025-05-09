import { Button } from "@radix-ui/themes";
import { Suspense, lazy, memo, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

// Lazy load and memoize the Spline component
const LazySpline = memo(lazy(() => import("@splinetool/react-spline")));

function Landing() {
  const { ready, authenticated, privyUser: user, login } = useAuth();
  const navigate = useNavigate();
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex justify-around">
      <motion.div
        className="pointer-events-none relative left-[9rem] z-30 flex w-[62rem] flex-col gap-3 py-[8rem] max-xl:left-[6rem] max-lg:left-[5rem] max-md:left-[3rem] max-sm:left-[2rem]"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.3, delayChildren: 0.5 }}
      >
        <motion.h1
          className="pointer-events-none text-8xl font-extrabold select-none max-lg:text-7xl max-md:text-4xl max-sm:text-2xl"
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
          {ready && !authenticated ? (
            <Button size={"4"} radius="full" onClick={login}>
              Get started
              <FaArrowRight />
            </Button>
          ) : (
            <Button
              size={"4"}
              radius="full"
              onClick={() => navigate(`/user/${user?.id}/dashboard`)}
            >
              Get started
              <FaArrowRight />
            </Button>
          )}
        </motion.div>
      </motion.div>
      <div className="relative h-[93vh] w-full overflow-hidden max-md:absolute">
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
            <div className="absolute right-0 bottom-0 z-20 h-[4rem] w-[12rem] bg-white dark:bg-[#121113]"></div>
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
}

export default memo(Landing);
