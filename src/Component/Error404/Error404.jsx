import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";

  
const Error404 = () => {
  useEffect (() => {
    document.title = "Lỗi truy cập";
  },[]);
  
  return (
  //   <div className="flex flex-col items-center justify-center h-screen w-[100%]">
  //     <div className="error-container flex flex-1 flex-col items-center  w-[100%]">
        <div className="relative z-2">
          <img src="./img/404.png" alt="Error 404" className="error-image w-[100%] h-[100vh]" />
        </div>
    //   </div>
    // </div>
  );
};

export default Error404;