import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../../core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];
const LearinigGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 mt-20">
      {LearningGridArray.map((elem, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 bg-richblack-900 xl:h-[294px]"} 
                ${
                  elem.order % 2 === 1
                    ? "bg-richblue-700 h-[294px]"
                    : "bg-richblack-800 h-[294px]"
                }
                ${elem.order === 3 && "lg:col-start-2"}
                `}
          >
            {elem.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0 ">
                <div className="text-4xl font-semibold text-richblack-50 ">
                  {elem.heading}
                  <HighlightText text={elem.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {elem.description}
                </p>
                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={elem.BtnLink}>
                    {elem.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{elem.heading}</h1>
                <p className="text-richblack-300 font-medium">
                  {elem.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearinigGrid;
