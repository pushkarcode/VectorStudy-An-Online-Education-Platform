import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="text-white w-[20vw] bg-richblack-900 h-[20vh] rounded-md border-[1.2px] border-richblack-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0_10px_50px_rgba(8,_112,_154,_0.7)]">
      <div className="p-2 py-4">
        <p className="text-richblack-5 font-bold text-[1.3vw]">{modalData.text1}</p>
        <p className="font-medium text-[1vw] text-richblack-500 mt-2 mb-1">{modalData.text2}</p>

        <div>
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button onclick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
