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
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={" Power of Code"} />
      </div>

      <p className="text-center text-richblack-300 text-lg font-semibold mt-2 ">
        Learn to build anything you can imagine
      </p>

      <div className="flex flex-row rounded-full bg-richblack-800 mt-5 mb-6 border-b border-richblack-500  ">
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

      <div className="lg:h-[20vh]"></div>
      {/* course card ka group  */}
      <div className="absolute flex -translate-x-[50%] translate-y-[50%] top-[15%] left-[28%] gap-x-20 w-full">
        {courses.map((elem, id) => {
          return (
             <CourseCard
             key={id}
             cardData = {elem}
             currentCard = {currentCard}
             setCurrentCard = {setCurrentCard}
              />
             );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
