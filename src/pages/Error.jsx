import React from 'react'
import Image from "../assets/Images/404page.jpg"

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img src={Image} className='object-cover' alt="" />
        <p className='text-3xl text-brown-600'>Error - 404 Not found</p>
    </div>
  )
}

export default Error