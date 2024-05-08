import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import OTPInput from "react-otp-input";
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { GiAnticlockwiseRotation } from "react-icons/gi";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!signupData) {
        nevigate("/signup")
    }
  },[])

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, nevigate)
    );
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      {loading ? (
        <Loader />
      ) : (
        <div className="text-richblack-400 w-[25%] flex flex-col justify-center ">
          <h1 className="text-3xl font-bold text-richblack-5 tracking-wide mb-2">
            Verify Email
          </h1>
          <p className="text-[1.1vw] text-richblack-300 font-medium leading-[1.3vw] mb-8">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} placeholder="-"   style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pl-6 text-richblack-5 ml-2 " />}
            />
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
            >
              Verify Email
            </button>
          </form>
          <div className="flex items-end justify-between">
            <Link to="/login">
              <p className="flex items-center ml-2 gap-x-1 mt-3 text-richblack-50 transition-all duration-200 hover:-translate-x-4">
                <span>
                  <GoArrowLeft />
                </span>
                Back to Login
              </p>
            </Link>
            <div className="flex items-center gap-x-1">
            <GiAnticlockwiseRotation />
          <button onClick={() => dispatch(sendOtp(signupData.email,nevigate))}>Resend it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
