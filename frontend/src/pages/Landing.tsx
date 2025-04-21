import { Button } from "@radix-ui/themes";
import Spline from "@splinetool/react-spline";
import { FaArrowRight } from "react-icons/fa6";

export function Landing() {
  return (
    <div className="flex justify-around relative">
      <div className="flex flex-col relative left-[10rem] py-[10rem] w-[60rem] gap-3">
        <h1 className="pointer-none select-none font-extrabold text-8xl">
          Welcome to Creator Club
        </h1>
        <p className="pointer-none select-none">
          A platform for creators to connect and collaborate
        </p>
        <div className="">
          <Button size={"4"} radius="full" className="">
            Get started
            <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="h-[93vh] w-full relative ">
        <Spline scene="https://prod.spline.design/0tinqLr4b8UmLGHR/scene.splinecode" />
        <div className="w-[10rem] h-[2.5rem] absolute z-50 left-[48.5rem] top-[41.5rem] bg-white dark:bg-black"></div>
      </div>
    </div>
  );
}
