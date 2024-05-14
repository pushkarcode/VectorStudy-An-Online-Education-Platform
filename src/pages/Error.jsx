import React from 'react'
import Image from "../assets/Images/404page.jpg"

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[90vh] '>
        <img src={Image} className='object-cover rounded-md shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]' alt="" />
    </div>
  )
}

export default Error