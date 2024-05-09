import React from "react";

const data = [
  {
    count: "5K",
    lable: "Active Student",
  },
  {
    count: "10+",
    lable: "Mentors",
  },
  {
    count: "200+",
    lable: "Courses",
  },
  {
    count: "50+",
    lable: "Awards",
  },
];

const StateSection = () => {
  return <section>
    <div>
        <div className="bg-richblack-800 flex items-center justify-around p-10 mb-6">
            {
                data.map((elem,index) => (
                    <div key={index} className="flex flex-col items-center gap-y-2">
                        <h1 className="text-richblack-5 font-bold text-[1.4vw]">{elem.count}</h1>
                        <h2 className="text-richblack-500 font-medium text-[1vw]">{elem.lable}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  </section>;
};

export default StateSection;
