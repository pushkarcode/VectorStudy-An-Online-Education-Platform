import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

const Home = () => {
  return (
    <div>
      {/* {section 1} */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent mt-8">
        <Link to={"/signup"}>
          <div className="mx-auto rounded-full bg-richblue-800 font-bold text-richblack-100 transition-all duration-200 hover:scale-95 w-fit mt-20 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] group overflow-hidden border-richblack-200 border-b-[.1px]">
            <div className="flex items-center gap-x-2 p-2 px-10 py-2 group-hover:bg-richblack-900 hover:border-none">
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
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-12 ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        {/* video added */}
        <div className="mx-3 my-7 mt-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            loop
            autoPlay
            className="rounded-sm shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"coding potentail"} /> with our
                online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={` <!DOCTYPE html>
                <html lang="en">
                <head>
                <title>This is myPage</title>
                </head>
                <body>
                <h1><a href="/">Header</a></h1>
                <nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>
                </nav>
                </body>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* code section 2 */}
        <div> 
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`import React from 'react'
                import CTAButton from "../Button"
                import { TypeAnimation } from 'react-type'
                import { HiArrowRight } from 'react-icons/hi'
                const Home = () => {
                  return (
                    <div>Home</div>
                  )
                }
export default Home`}
            codeColor={"text-richblack-100"}
          />
        </div>
      </div>

      {/* {section 2} */}

      {/* {section 3} */}

      {/* { footer} */}
    </div>
  );
};

export default Home;
