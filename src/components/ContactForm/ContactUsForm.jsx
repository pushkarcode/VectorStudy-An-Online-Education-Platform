import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import Countrycode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Login Data", data);
    try {
      setLoading(true);
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      const response = { status: "OK" };
      console.log("Loggin Response", response);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-x-3 items-center">
          {/* firstname  */}
          <div className="flex flex-col ">
            <label
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              htmlFor="firstname"
            >
              First Name{" "}
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.firstname && (
              <span className="error">Please enter Your Name</span>
            )}
          </div>

          {/*  lastname  */}
          <div className="flex flex-col">
            <label
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              {...register("lastname")}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </div>
        </div>

        {/* Email  */}
        <div className="flex flex-col">
          <label
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            {...register("email", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.email && (
            <span className="error">Please enter a valid email address</span>
          )}
        </div>

        {/* phone no  */}
        <div className="flex flex-col gap-2">
          <label
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            htmlFor="phonenumber"
          >
            Phone Number
          </label>

          <div className="flex flex-row gap-5">
            {/* dropdown */}
            <div className="flex w-[86px] flex-col gap-2">
              <select
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              >
                {Countrycode.map((elem, index) => {
                  return (
                    <option key={index}>
                      {elem.code} -{elem.country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="70000 67890"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[160%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                {...register("phoneNo", {
                  require: {
                    value: true,
                    message: "please enter phone number",
                  },
                  maxLength: { value: 10, message: "Invalid phone number" },
                  minLength: { value: 8, message: "Invalid phone number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="error">{errors.phoneNo.message}</span>
          )}
        </div>

        {/* message  */}
        <div className="flex flex-col">
          <label
            className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter Your Message here..."
            {...register("message", { require: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.message && (
            <span className="error">Please enter your message</span>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
          ${
            !loading &&
            "transition-all duration-200 hover:scale-95 hover:shadow-none"
          }  disabled:bg-richblack-500 sm:text-[16px] `}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
