import React, { useEffect, useState,useRef } from "react";
import Header from "../../Header&Footer/Header/Header";
import Footer from "../../Header&Footer/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { FaUser, FaListAlt, FaDonate } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import styles from "./style.module.scss";
import axios from "axios";
import Profile from "./ProfileCON/Profile";
import Test3 from "../../Test/Test3";
import Cookies from "js-cookie";
import SiderBar from "../../Admin/SiderBar/SiderBar";
import Page2 from "./Page2/Page2";
import "./Profile.css";
import DonateHistory from "./DonateHistory/DonateHistory";
import Follow from "../Follow/Follow";
import Swal from "sweetalert2";

const ProfileCHA = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [pasword, setPasword] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPage, setCurrentPage] = useState("Profile");
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("token");
  //   navigate("/Home");
  // };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData=async()=>{
    const storedToken = Cookies.get("token");
    if (storedToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data.userInfo);
          setUsername(response.data.userInfo.username);
          setFullname(response.data.userInfo.fullname);
          setEmail(response.data.userInfo.email);
          setPasword(response.data.userInfo.pasword);
          setPhone(response.data.userInfo.phone);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }else {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        icon: "warning"
      });
      navigate(`/home`);
    }
  }
  // const handleUpdate = () => {
  //   axios
  //     .post("${process.env.REACT_APP_API_URL}/api/profile", {
  //       username: username,
  //       fullname: fullname,
  //       email: email,
  //       pasword: pasword,
  //       phone: phone,
  //     })
  //     .then((response) => {
  //       console.log("Thông tin đã được cập nhật thành công:", response.data);
  //       alert("Sửa thông tin thành công");
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi cập nhật thông tin:", error);
  //       alert("Sửa thông tin thất bại");
  //     });
  // };
  const handleClick= () =>{
    navigate("/AdminPage");
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPage = () => {
    switch (currentPage) {
      case "Profile":
        return <Profile fetchData={fetchData}/>;
      case "SiderBar":
        return <SiderBar />;
      case "Follow":
        return <Follow />;
      case "DonateHistory":
        return <DonateHistory />;
        // case "Follow":
        // return <Follow />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-[#263238]">
      <Header />
      <div className="bg-[#253238] flex  justify-center">
        <div className="md:max-w-[1280px] w-full justify-center flex-col bg-[#141414] p-[20px] xl:mt-[120px] mt-[100px] xl:rounded">
          <div className="flex flex-row p-[5px] bg-[263238] rounded ">
            <div className="flex flex-col max-w-[300px] border-r-[1px] border-[#F9F9FB] bg-[#263238] rounded-tl-[4px] xl:rounded">
              <div className="flex flex-col my-[35px]">
                <div className="flex flex-col items-center mb-[30px] bg-[#263238]">
                  <img
                    src="../../img/AVT/03ebd625cc0b9d636256ecc44c0ea324.png"
                    alt="?"
                    className="w-[50%]"
                  />
                  <div className="flex text-white mt-[10px]">
                    Fullname:
                    <span className="ml-[5px] text-block">
                      {fullname !== null && fullname !== ""
                        ? fullname
                        : "User didn't set fullname"}
                    </span>
                  </div>
                  <div className="flex text-white mt-[10px]">
                    Email:
                    <span className="ml-[5px] text-block">
                      {email !== null && email !== ""
                        ? email
                        : "User didn't set email"}
                    </span>
                  </div>
                  <div className="flex text-white mt-[10px]">
                    Phone number:
                    <span className="ml-[5px] text-block">
                      {phone !== null && phone !== ""
                        ? phone
                        : "User didn't set phone"}
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className={`flex flex-col ${styles.sidebar}`}>
                    <ul class={`flex flex-col ${styles.nav}`}>
                      <li
                        className={`${
                          currentPage === "Profile" ? styles.active : ""
                        } flex flex-1 flex-row items-center`}
                        onClick={() => handlePageChange("Profile")}
                      >
                        <FaUser className=" mr-[10px] " />
                        <span className="">Profile</span>
                      </li>
                      {username === "admin" && (
                        <li
                          className={`${
                            currentPage === "SiderBar" ? styles.active : ""
                          } flex flex-1 flex-row items-center`}
                          onClick={(handleClick) }
                        >
                          <RiAdminFill className=" mr-[10px] " />
                          <span className="">Admin Page</span>
                        </li>
                      )}
                      <li
                        className={`${
                          currentPage === "Follow" ? styles.active : ""
                        } flex flex-1 flex-row items-center`}
                        onClick={() => handlePageChange("Follow")}
                      >
                        <FaListAlt className=" mr-[10px] " />
                        <span className="">Follow Movie</span>
                      </li>
                      <li
                        className={`${
                          currentPage === "DonateHistory" ? styles.active : ""
                        } flex flex-1 flex-row items-center`}
                        onClick={() => handlePageChange("DonateHistory")}
                      >
                        <FaDonate className=" mr-[10px] " />
                        <span className="">Donate history</span>
                      </li>
                      {/* <li
                        className={`${
                          currentPage === "Follow" ? styles.active : ""
                        } flex flex-1 flex-row items-center`}
                        onClick={() => handlePageChange("Follow")}
                      >
                        <FaDonate className=" mr-[10px] " />
                        <span className="">Follow</span>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex flex-1 bg-[#263238] w-full py-[30px] rounded-br-[4px] rounded-tr-[4px]">
              {renderPage()}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:mt-[20px] flex justify-center ">
        <Footer />
      </div>
    </div>
  );
};

export default ProfileCHA;
