import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";

const Navbar = () => {
    const location = useLocation();
    const matchRoute = (route) => {
          return matchPath({path:route}, location.pathname)
    }
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
                  <div></div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "ring-richblack-25"}`}>{link.title}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Golu-->Login/SignUp/Dashboard  */}
        <div className="flex gap-x-4 items-center">

        </div>

      </div>
    </div>
  );
};

export default Navbar;
