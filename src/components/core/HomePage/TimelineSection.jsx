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
      <div className="flex flex-row gap-x-[5vw] items-center">
        <div className="w-[45%] flex flex-col gap-3">
          {timeline.map((elem, index) => {
            return (
              <>
                <div key={index} className="flex flex-row gap-6">
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
                  <div className={`border-l-[1px] border-richblue-300 border-dotted h-[60px] ml-6`}></div>
                )}
              </>
            );
          })}
        </div>

        {/* right wala part */}
        <div className="relative shadow-[0px_-7px_50px_-5px] shadow-richblue-200">
          <img src={timelineImage} alt="golu" className="shadow-white shadow-[20px_20px_0px_0px]  object-cover rounded-sm" />

          <div className="absolute">

          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
