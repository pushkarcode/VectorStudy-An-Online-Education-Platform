import React from 'react'
import loding from "../../assets/Images/loader.gif"

const Loader = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
      <img className='lg:h-[50%] h-[30%] object-cover' src={loding} alt='loader'/>
    </div>
  )
}

export default Loader 