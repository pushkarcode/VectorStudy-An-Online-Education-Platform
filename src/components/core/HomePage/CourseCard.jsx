import React from "react";
import { MdOutlineOndemandVideo, MdPeople } from "react-icons/md";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div>
      <div className="bg-richblack-800 w-[23vw] h-[37vh] rounded-sm p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <p className="text-[1.6vw] font-semibold text-richblue-25 mb-1">
          {cardData.heading}
        </p>
        <p className="font-medium text-richblack-400 leading-5 mt-3 h-[15vh]">
          {cardData.description}
        </p>
        <div className="flex items-center justify-between mt-8 border-t-2 border-dashed border-richblack-500 text-richblack-200">
          <p className="mt-2 flex items-center gap-1">
            <MdPeople />
            {cardData.level}
          </p>
          <p className="mt-2 flex items-center gap-1">
            <MdOutlineOndemandVideo />
            {cardData.lessionNumber} Lession
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
