import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../../Home/Home";
import UserAD from "../UserAD/UserAD";
import MovieAD from "../MovieAD/MovieAD";
import DonateAD from "../DonateAD/DonateAD";
import CategoryAD from "../CategoryAD/CategoryAD";
import styles from "./style.module.scss";
import "./style.css";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TypeAD from "../TypeAD/TypeAD";
import { MdMovie, MdManageAccounts } from "react-icons/md";
import { TbCategoryFilled, TbFilters } from "react-icons/tb";
import { FaDonate, FaHome } from "react-icons/fa";

const SiderBar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState("UserAD");
  const [showImage, setShowImage] = useState(false);
  let isDeny = false;
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const Deny = () => {
    if (!isDeny) {
      isDeny = true;
      toast.error("Từ chối truy cập", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Donate":
        return <DonateAD />;
      case "Category":
        return <CategoryAD />;
      case "Movie":
        return <MovieAD />;
      case "UserAD":
        return <UserAD />;
      case "Home":
        return <Home />;
      case "Type":
        return <TypeAD />;
      default:
        return null;
    }
  };

  const fetchData = async () => {
    const storedToken = Cookies.get("token");
    try {
      if (storedToken) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.status === 200) {
          setIsAdmin(true);
        } else if (response.status === 201) {
          setShowImage(true);
          Deny();
          await delay(3000);
          navigate("/Home");
        }
      } else {
        setShowImage(true);
        Deny();
        await delay(3000);
        navigate("/Home");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const BackHome = () => {
    navigate("/Home");
  };
  return (
    <div className={`w-full flex justify-center bg-black min-h-screen `}>
      {isAdmin? (  
        <div className="flex flex-row flex-1 bg-[#263238]  text-white relative max-w-[1600px]">
          <div className="render">
            <div className="flex justify-center items-center py-[10px]">
              <img
                src="../../img/AVT/03ebd625cc0b9d636256ecc44c0ea324.png"
                alt="?"
                className="w-[40%] h-auto"
              />
            </div>
            <ul className="flex flex-1 flex-col cursor-pointer">
              <li
                className={`${currentPage === "UserAD" ? styles.active : ""}  `}
                onClick={() => handlePageChange("UserAD")}
              >
                <MdManageAccounts />
                <span>Management User</span>
              </li>
              <li
                className={`${currentPage === "Movie" ? styles.active : ""} `}
                onClick={() => handlePageChange("Movie")}
              >
                <MdMovie />
                <span>Movie</span>
              </li>
              <li
                className={`${
                  currentPage === "Category" ? styles.active : ""
                }  `}
                onClick={() => handlePageChange("Category")}
              >
                <TbCategoryFilled />
                <span>Category</span>
              </li>
              <li
                className={`${currentPage === "Type" ? styles.active : ""} `}
                onClick={() => handlePageChange("Type")}
              >
                <TbFilters />
                <span>Type</span>
              </li>
              <li
                className={`${
                  currentPage === "Donate" ? styles.active : ""
                }   `}
                onClick={() => handlePageChange("Donate")}
              >
                <FaDonate />
                <span>Donate</span>
              </li>

              <li onClick={BackHome}>
                <FaHome />
                <span>Home</span>{" "}
              </li>
            </ul>
          </div>

          <div className="flex flex-1">{renderPage()}</div>
        </div>
      ) : (
        showImage && <img src="/img/400.jpg" />
      )}
      <ToastContainer />
    </div>
  );
};
export default SiderBar;
