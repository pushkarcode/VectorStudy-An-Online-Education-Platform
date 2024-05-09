import React from 'react'
import ContactUsForm from '../../ContactForm/ContactUsForm'

const ContactFromSection = () => {
  return (
    <div className='text-richblack-25  flex flex-col items-center mt-28'>
         <h1 className='text-[2.3vw] font-bold text-richblack-25 tracking-wide '>
            Get in Touch
         </h1>
         <p className='text-richblack-300'>We’d love to here for you, Please fill out this form.</p>

         <div className='mt-12'>
            <ContactUsForm/>
         </div>

    </div>
  )
}

export default ContactFromSection