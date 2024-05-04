import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button";
import { HiArrowRight } from 'react-icons/hi';

const InstructorSection = () => {
  return (
    <div>
        <div className='lg:flex flex-row gap-20 items-center'>
         <div className='lg:w-[47%] py-20  shadow-richblue-500'>
          <img src={InstructorImage} alt="InstructorImage" className='shadow-white lg:shadow-[-20px_-17px_0_0] shadow-[-10px_-11px_0_0] ' />
         </div>
         <div className='lg:w-[53%] flex flex-col gap-10 items-start'>
          <div className='text-4xl font-semibold lg:w-[50%] tracking-widest'>
            Become an <HighlightText text={"Instructor"}/> 
          </div>

          <p className='font-medium text-[16px] lg:w-[80%] -mt-6 lg:-mt-0 text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
            
         <CTAButton active={true} linkto={"/signup"}>
            <div className='flex items-center gap-2 '>
             Start Learning Today
             <HiArrowRight/>
            </div>
         </CTAButton>

         </div>
        </div>
    </div>
  )
}

export default InstructorSection