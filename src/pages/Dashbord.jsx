import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { Outlet } from "react-router-dom";
import Siderbar from "../components/core/Dashboard/Siderbar";

const Dashbord = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <Loader />;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Siderbar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
