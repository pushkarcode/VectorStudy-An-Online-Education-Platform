import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Loader from "../components/common/Loader";
import { GoArrowLeft } from "react-icons/go";

const ForgetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      {loading ? (
        <Loader />
      ) : (
        <div className="text-richblack-400 w-[25%] flex flex-col justify-center ">
          <h1 className="text-3xl font-bold text-richblack-5 tracking-wide mb-2">
            {!emailSent ? "Reset you're Password" : "Check yout Email"}
          </h1>

          <p className="text-[1.1vw] text-richblack-300 font-medium leading-[1.3vw] mb-8">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className="mb-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full mb-2"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div>
            <Link to="/login">
              <p className="flex items-center ml-2 gap-x-1 mt-3 text-richblack-50 transition-all duration-200 hover:-translate-x-4"><span><GoArrowLeft /></span>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
