import React from "react";
import HighlightText from "./HighlightText";
import Know_your_Progress from "../../../assets/Images/Know_your_progress.png";
import copare_with_others from "../../../assets/Images/Compare_with_others.png";
import plane_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";


const LearningLanguageSection = () => {
  return (
    <div className="mt-[17vh]">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base mt-1 font-medium lg:w-[85%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="lg:flex flex-row items-center justify-center mt-5 ">
          <img
            src={Know_your_Progress}
            alt="Know_your_Progress"
            className="object-contain lg:-mr-28 -mb-10 lg:-mb-0 " 
          />
          <img
            src={copare_with_others}
            alt="copare_with_others"
            className="object-contain"
          />
          <img
            src={plane_your_lesson}
            alt="plane_your_lesson"
            className="object-contain lg:-ml-36 -mt-16 lg:mt-0"
          />
        </div>
        <div className="w-fit mb-12">
        <CTAButton active={true} linkto={"/signup"}> 
              <div>
                Learn more
              </div>
        </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
