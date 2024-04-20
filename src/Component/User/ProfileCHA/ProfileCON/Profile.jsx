import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Profile = ({fetchData}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/Home");
  };

  useEffect(() => {
    document.title = "Thông tin cá nhân";
  }, []);
  useEffect(() => {
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
          setPassword(response.data.userInfo.password);
          setPhone(response.data.userInfo.phone);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);
  const handleUpdate = () => {
    const storedToken = Cookies.get("token");
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/profile`,
        {
          username: username,
          fullname: fullname,
          email: email,
          password: password,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Thông tin đã được cập nhật thành công:", response.data);
        fetchData();
        Swal.fire({
          text: "Sửa thông tin thành công",
          icon: "success"
        });
        // alert("Sửa thông tin thành công");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
        Swal.fire({
          text: "Sửa thông tin thất bại",
          icon: "error"
        });
        // alert("Sửa thông tin thất bại");
      });
  };
  return (
    <div className="flex flex-col flex-1 px-[35px] bg-[#263238]">
      <div className="flex flex-row flex-1">
        <div className="main flex flex-col ">
          <div>
            <span className="hover:underline text-xl text-white font-bold">
              Cài đặt profile
            </span>
          </div>
          <div className="flex flex-row py-[30px]">
            <div className="flex flex-col flex-1 bg-[#263238] px-[60px] border-none ">
              <div className="flex justify-between py-[16px]">
                <div className="flex flex-1 flex-row items-center">
                  <span className="text-xl text-white font-semibold mr-[30px] w-[130px]">
                    Fullname
                  </span>
                  <input
                    type="input"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="border-[2px] border-[#40BABD] focus:outline-none py-[5px] px-[10px] flex flex-1 rounded-[5px] bg-[#263238] text-white"
                  />
                </div>
              </div>
              <div className="flex justify-between py-[16px]">
                <div className="flex flex-1 flex-row items-center">
                  <span className="text-xl text-white font-semibold mr-[30px] w-[130px]">
                    Email
                  </span>
                  <input
                    type="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-[2px] border-[#40BABD] focus:outline-none py-[5px] px-[10px] flex flex-1 rounded-[5px] bg-[#263238] text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between py-[16px]">
                <div className="flex flex-1 flex-row items-center">
                  <span className="text-xl text-white font-semibold mr-[30px] w-[130px]">
                    Số điện thoại
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-[2px] border-[#40BABD] focus:outline-none py-[5px] px-[10px] flex flex-1 rounded-[5px] bg-[#263238] text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex1">
              <div className="flex justify-between py-[16px]">
                <div className="flex flex-1 flex-row items-center">
                  <span className="text-xl text-white font-semibold mr-[30px] w-[130px]">
                    Username
                  </span>
                  <input
                    type="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border-[2px] border-[#40BABD] focus:outline-none py-[5px] px-[10px] flex flex-1 rounded-[5px] bg-[#263238] text-white"
                  />
                </div>
              </div>
              <div className="flex justify-between py-[16px]">
                <div className="flex flex-1 flex-row items-center">
                  <span className="text-xl text-white font-semibold mr-[30px] w-[130px]">
                    Password
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-[2px] border-[#40BABD] focus:outline-none py-[5px] pl-[10px] pr-[30px] flex flex-1 rounded-[5px] bg-[#263238] text-white "
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      onClick={toggleShowPassword}
                      className="eye-icon text-white cursor-pointer ml-[-25px]"
                    />
                  ) : (
                    <FaRegEye
                      onClick={toggleShowPassword}
                      className="eye-icon text-white cursor-pointer ml-[-25px]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly ">
        <button onClick={handleUpdate}>
          <div className="bg-[#EF4444] p-[10px] rounded-full border border-solid border-red-500 text-white font-bold hover:bg-[#3EA6FF]">
            Lưu thông tin
          </div>
        </button>
        <button onClick={handleLogout}>
          <div className="bg-[#EF4444] p-[10px] rounded-full border border-solid border-red-500 text-white font-bold hover:bg-[#3EA6FF]">
            Đăng xuất
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile;
