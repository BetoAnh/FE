import React from "react";
import { NavLink } from "react-router-dom";
export const ButtonHome = () =>{
    return(
        <div>
            <NavLink
          to="/Home"
          className="absolute z-10 bottom-0 left-[40%]  px-[30px] py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-colors duration-300"
        >
          Go back to homepage
        </NavLink>
        </div>
    )
}
