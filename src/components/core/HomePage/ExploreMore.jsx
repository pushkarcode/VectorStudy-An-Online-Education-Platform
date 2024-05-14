import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="relative">
      <div className="lg:text-4xl text-[7.4vw] ml-[35vw] lg:ml-0 font-semibold  lg:text-center">
        Unlock the
        <HighlightText text={" Power of Code"} />
      </div>

      <p className="lg:text-center ml-[35vw] lg:ml-0 text-richblack-300 text-lg font-semibold mt-2 ">
        Learn to build anything you can imagine
      </p>

      <div className="flex flex-row opacity-0 lg:opacity-100 rounded-full bg-richblack-800 mt-5 lg:mb-6 mb-[80vh] border-b border-richblack-500  ">
        {tabsName.map((elem, id) => {
          return (
            <div
              key={id}
              className={`text-[16px] flex flex-row items-center gap-2 ${
                currentTab === elem
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-10 py-[.6vw] m-1 `}
              onClick={() => setMyCards(elem)}
            >
              {elem}
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* course card ka group  */}
      <div className="lg:absolute gap-10 justify-center lg:gap-5 flex lg:justify-between flex-wrap lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3 w-[70vw] ">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
