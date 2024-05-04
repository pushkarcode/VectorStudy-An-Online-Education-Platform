import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
    active: true,
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
    active: true,
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
    active: true,
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
    active: false,
  },
];
const TimelineSection = () => {
  return (
    <div>
      <div className="lg:flex flex-row  gap-x-[5vw] items-center">
        <div className="lg:w-[45%] flex flex-col lg:gap-3 gap-y-1">
          {timeline.map((elem, index) => {
            return (
              <>
                <div key={index} className="flex flex-row lg:gap-6 gap-x-6">
                  <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                    <img src={elem.Logo} alt="golu" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">
                      {elem.Heading}
                    </h2>
                    <p className="text-base">{elem.Description}</p>
                  </div>
                </div>
                {elem.active && (
                  <div
                    className={`border-l-[1px] border-richblue-300 border-dotted h-[60px] ml-6`}
                  ></div>
                )}
              </>
            );
          })}
        </div>

        {/* right wala part */}
        <div className="relative shadow-[0px_-7px_50px_-5px] shadow-richblue-200 mt-16 lg:mt-0">
          <img
            src={timelineImage}
            alt="golu"
            className="shadow-white shadow-[20px_20px_0px_0px]  object-cover rounded-sm"
          />

          <div className="absolute lg:translate-x-[10%]  lg:-translate-y-[50%] bg-caribbeangreen-700 flex flex-row text-white uppercase py-8 px-2 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 lg:px-7 ">
              <p className="text-3xl font-bold">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-5 items-center px-7">
              <p className="text-3xl font-bold">250</p>
              <p className="text-caribbeangreen-300 text-sm">
                Type of Courses
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
