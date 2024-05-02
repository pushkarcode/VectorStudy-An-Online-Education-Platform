import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";

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
            backgroundGradient={"code1"}
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
            backgroundGradient={"code"}
          />
        </div>
      </div>

      {/* {section 2} */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[40vh]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto">
            <div className="h-[15vh]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-x-2">
                  Explore Full Catalog
                  <HiArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mt-20">
          <div className="flex flex-row gap-x-[12vw] mb-12">
            <div className="text-[2.2vw] font-semibold leading-9 tracking-tight w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-9 w-[40%] items-start">
              <p className="text-[1.3vw] font-light text-richblack-800 leading-[1.4vw] tracking-wide">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>

        
      </div>

      {/* {section 3} */}

      {/* { footer} */}
    </div>
  );
};

export default Home;
