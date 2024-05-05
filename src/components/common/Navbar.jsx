import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";

// const subLinks = [
//   {
//     title: "python",
//     link: "catalog/python",
//   },
//   {
//     title: "web dev",
//     link: "catalog/web-development",
//   },
//   {
//     title: "backend dev",
//     link: "catalog/backend-development",
//   },
//   {
//     title: "front dev",
//     link: "catalog/frontend-development",
//   },
//   {
//     title: "front dev",
//     link: "catalog/frontend-development",
//   },
// ];

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubliks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("priting SUblinks result:", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Cloud not fetch the categroy list", error);
    }
  };

  useEffect(() => {
    fetchSubliks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-600">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between text-richblack-25">
        <Link to="/">
          <p className="font-bold text-[1.5vw] font-['Gilroy'] tracking-wide">
            <span className="text-[2vw] mr-1">𐎏</span>VectorStudy
          </p>
        </Link>

        {/* Nav links */}
        <nav>
          <ul className="flex gap-x-6  text-richblack-25">
            {NavbarLinks.map((link, id) => (
              <li key={id}>
                {link.title === "Catalog" ? (
                  // ! (this thing taking soo much time)
                  <div className="flex items-center gap-x-1 group relative">
                    <p className="font-[Gilroy] text-[1.1vw] tracking-wide">{link.title}</p>
                    <IoIosArrowDown />

                    <div
                      className="invisible absolute left-[50%]  top-[163%] translate-x-[-50%]
                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblue-900  opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[18vw] py-4 z-[999]"
                    >
                      <div className="absolute left-[50%] -top-1 h-10 w-10 rotate-45 rounded-sm bg-richblack-5 translate-x-[37%] z-[-999] "></div>
                      {subLinks?.length ? (
                        subLinks.map((sublink, id) => (
                          <Link to={`${sublink.link}`} key={id}>
                            <p className="p-2 text-[1.2vw] font-normal text-richblack-700 tracking-wider transition-all duration-200 hover:bg-richblack-300  rounded-sm">{sublink.title}</p>
                          </Link>
                        ))
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>



        {/*  Golu-->Login/SignUp/Dashboard  */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <IoCartOutline size={12} />
              {totalItems > 0 && (
                <span className="bg-yellow-50">{totalItems}</span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[.5vw] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[.5vw] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
