import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";


const Home = () => {
  return (
    <div>
      {/* {section 1} */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="mx-auto rounded-full bg-richblue-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-16 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] group overflow-hidden">
            <div className="flex items-center gap-x-2 p-2 px-3 group-hover:bg-richblack-900">
              <p>Become An Instructer</p>
              <HiArrowRight />
            </div>
          </div>
        </Link>

        <div className="mt-7 text-4xl font-semibold ">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
        
        <div className="flex flex-row gap-7 mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              Book a Demo
            </CTAButton>

        </div>

      </div>

      {/* {section 2} */}

      {/* {section 3} */}

      {/* { footer} */}
    </div>
  );
};

export default Home;
