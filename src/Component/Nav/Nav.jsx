import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { RiLogoutBoxLine, RiAdminFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import styles from "./style.module.scss";
import "./style.css";
import axios from "axios";
import Cookies from "js-cookie";
// import SiderBar from "./../Admin/SiderBar/SiderBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Nav = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const timkiemthatbai = (mess) => {
    toast.error(`Không tìm được phim với tên: ${mess}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const nhapdetimkiem = () => {
    toast.error(`Vui lòng nhập tên phim cần tìm!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const hanldeProfile = () => {
    navigate("/Profile");
  };
  const hanldeProfile2 = () => {
    navigate("/Test1");
  };
  const hanldeAdminPage = () => {
    navigate("/AdminPage");
  };
  const handleHover = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  const handleHover2 = () => {
    setOpen2(true);
  };
  const handleMouseLeave2 = () => {
    setOpen2(false);
  };
  const handleHover3 = () => {
    setOpen3(true);
  };
  const handleMouseLeave3 = () => {
    setOpen3(false);
  };
  const handleHover4 = () => {
    setOpen4(true);
  };
  const handleMouseLeave4 = () => {
    setOpen4(false);
  };
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/Home");
  };

  const isLoggedIn = document.cookie.includes("token=");

  // const handleVideoClick = (event) => {
  //   event.preventDefault();
  //   const videoUrl = event.currentTarget.getAttribute("href");
  //   window.location.href = videoUrl;
  // };

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    searchMovies(newSearchTerm);
  };

  const searchMovies = async (searchTerm) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/find?search=${searchTerm}`
      );
      const movies = response.data.movies;
      setSearchResults(movies);

      if (movies.length > 0) {
        console.log("Tìm được phim");
        // alert("Tìm được phim với tên: " + names.join(", "));
      } else {
        console.log("Không tìm được phim");
        // alert("Không tìm được phim với tên: " + searchTerm);
        timkiemthatbai(searchTerm);
      }

      const filteredMovies = movies.filter((movie) => {
        const regex = new RegExp(searchTerm, "i");
        const movieName = movie.name ? movie.name.toLowerCase() : "";
        const movieSubName = movie.subName ? movie.subName.toLowerCase() : "";
        return regex.test(movieName) || regex.test(movieSubName);
      });
      setFilter(filteredMovies);
    } catch (error) {
      console.error(error);
      console.log("Không được phim do " + error);
      // alert("Không được phim với tên: " + searchTerm);
      timkiemthatbai(searchTerm);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.trim();
      if (inputValue !== "") {
        searchMovies(event);
      } else {
        // alert("Vui lòng nhập tên phim cần tìm!");
        nhapdetimkiem();
        setSearchResults(false);
      }
    }
  };
  const clickcc = () => {
    alert("Xem thêm cc");
  };
  // const handleLogin = () => {
  //     setIsLoggedIn(true);
  //     localStorage.setItem('isLoggedIn', true);
  // };

  // const handleLogout = () => {
  //     setIsLoggedIn(false);
  //     localStorage.removeItem('isLoggedIn');
  // };
  // useEffect(() => {
  //     const loggedInStatus = localStorage.getItem('isLoggedIn');
  //     if (loggedInStatus) {
  //         setIsLoggedIn(true);
  //     }
  // }, []);
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
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, []);
  const handleLoginClick = () => {
    window.scrollTo(0, 300);
  };

  return (
    <div className="w-full relative flex justify-center ">
      <div className="flex items-center h-[100px] top-0 z-50 bg-black w-full md:max-w-[1280px] justify-evenly xl:rounded">
        <NavLink
          to="/Home"
          className="h-full w-[100px] flex items-center justify-center mr-[2%] ml-[2%]"
        >
          <div className="flex justify-center w-[75px]">
            <img
              src="../../img/logoPage.png"
              alt="logo"
              className="h-auto max-h-[100%]"
            />
          </div>
        </NavLink>

        <div className=" hidden md:flex justify-start gap-5 h-[100%] mr-[2%]">
          <button className="hidden items-center lg:flex">
            <NavLink to="/Home" className="text-white text-2xl line-clamp-1">
              Trang chủ
            </NavLink>
          </button>

          <button
            className={`${styles.menu}`}
            onMouseEnter={handleHover3}
            onMouseLeave={handleMouseLeave3}
          >
            <NavLink className="text-white text-2xl line-clamp-1">
              Top phim
            </NavLink>
            <div
              className={`submenu ${
                (styles.submenu, open3 ? "active" : "inactive")
              }`}
            >
              <ul className="bg-white  ">
                <li>
                  <button className=" ">
                    <NavLink to="/Home" className="">
                      Theo năm
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className="  ">
                    <NavLink to="/Home" className="">
                      Theo mùa
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/Home" className="">
                      Theo ngày
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className="">
                    <NavLink to="/phim-moi" className="">
                      Phim Mới
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className="">
                    <NavLink to="/phim-noi-bat" className="">
                      Phim Nổi Bật
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className="">
                    <NavLink to="/danh-muc/phim-bo" className="">
                      Phim Bộ
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className="  ">
                    <NavLink to="/danh-muc/phim-le" className="">
                      Phim Lẻ
                    </NavLink>
                  </button>
                </li>
              </ul>
            </div>
          </button>

          <button
            className={`${styles.menu}`}
            onMouseEnter={handleHover2}
            onMouseLeave={handleMouseLeave2}
          >
            <NavLink className="text-white text-2xl line-clamp-1">
              Thể loại
            </NavLink>
            <div
              className={`submenu ${
                (styles.submenu, open2 ? "active" : "inactive")
              }`}
            >
              <ul className="bg-white  ">
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/action" className="">
                      Action
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/adventure" className="">
                      Adventure
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/drama" className="">
                      Drama
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/fantasy" className="">
                      Fantasy
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/horror" className="">
                      Horror
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/romatic" className="">
                      Romatic
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/school" className="">
                      School
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/psychological" className="">
                      Psychological
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/supernatural" className="">
                      Supernatural
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className="">
                    <NavLink to="/the-loai/game" className="">
                      Game
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/super-power" className="">
                      Super Power
                    </NavLink>
                  </button>
                </li>
                <li>
                  <button className=" ">
                    <NavLink to="/the-loai/family" className="">
                      Family
                    </NavLink>
                  </button>
                </li>
              </ul>
            </div>
          </button>

          {/* <button className="w-1/5">
            <NavLink to="/ExPage" className="text-white text-2xl">
              Thư viện
            </NavLink>
          </button> */}
          <button className="">
            <NavLink
              to="/sap-chieu"
              className="text-white text-2xl line-clamp-1"
            >
              Sắp chiếu
            </NavLink>
          </button>
          <button className="">
            <NavLink to="/Donate" className="text-white text-2xl line-clamp-1">
              Donate
            </NavLink>
          </button>
        </div>
        <div className=" md:w-1/4 flex-1 min-w-[200px] w-1/2">
          {isLoggedIn ? (
              <input
                type="search"
                id="search-input"
                placeholder="Tìm kiếm: Tên phim..."
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onMouseEnter={handleHover4}
                onMouseLeave={handleMouseLeave4}
                className="w-full rounded-full px-4 py-2 z-10 relative border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-600 text-white"
              />
          ) : (
              <input
                type="search"
                id="search-input"
                placeholder="Tìm kiếm: Tên phim..."
                value={searchTerm}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onMouseEnter={handleHover4}
                onMouseLeave={handleMouseLeave4}
                className="w-full rounded-full px-4 py-2 z-10 relative border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-600 text-white"
              />
          )}
          {searchResults && searchResults.length > 0 && (
            <div
              className={`submenufind ${open4 ? "active" : "inactive"} ${
                isLoggedIn ? "isLogin " : ""
              }`}
              onMouseEnter={handleHover4}
              onMouseLeave={handleMouseLeave4}
            >
              <ul className="rounded py-[5px]">
                {searchResults.slice(0, 5).map((movie, index) => (
                  // HIỂN THỊ TOÀN BỘ NAME //          {searchResults.map((name, index) => (
                  <a href={`/phim/${movie.movieurl}-a${movie.movieid}`}>
                    <li
                      className="h-[70px] relative flex flex-row border-b-[1px] items-center p-[5px]"
                      key={index}
                    >
                      <div className=" w-[40px] h-[100%] relative flex-none ">
                        <img
                          className="absolute top-0 left-0 w-full h-full object-cover rounded"
                          src={`${process.env.REACT_APP_API_URL}/upload/poster/${movie.poster}`}
                          alt="Movie Avatar"
                        />
                      </div>
                      <span className="flex-grow truncate ml-2">
                        {movie.moviename}
                      </span>
                    </li>
                  </a>
                ))}
                {searchResults.length > 5 && (
                  <div className="flex justify-center items-center p-[10px] bg-[#B5E745] text-black font-bold cursor-pointer hover:bg-[#A2D63A]">
                    {/* <button>
                      <NavLink> Xem thêm</NavLink>
                    </button> */}
                    <button className="" onClick={clickcc}>
                      <NavLink> Xem thêm</NavLink>
                    </button>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>

        <div
          className="block md:hidden"
          // onMouseEnter={handleHover}
          // onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center justify-center bg-transparent p-1 rounded-md ml-[5px] mr-[20px] md:ml-0 md:absolute md:right-4 md:top-4 text-white">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18M3 6h18M3 18h18"></path>
            </svg>
          </button>
          <div
            className={`dropdown submenuUser bg-white ${
              open ? "active" : "inactive"
            }`}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="">
              <DropdownItem
                icon={<FaRegUserCircle />}
                name="Profile"
                onClick={hanldeProfile}
              />
              {/* <DropdownItem
                icon={<FaRegUserCircle />}
                name="Profile"
                onClick={hanldeProfile2}
              /> */}
              {username === "admin" && (
                <DropdownItem
                  icon={<RiAdminFill />}
                  name="Admin"
                  onClick={hanldeAdminPage}
                />
              )}
              <DropdownItem
                icon={<RiLogoutBoxLine />}
                name="Logout"
                onClick={handleLogout}
              />
            </ul>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="hidden relative  w-[50px] md:flex md:items-center text-white font-bold rounded-md mr-[2%] ml-[2%] justify-center">
            <NavLink to="/Profile">
              <FontAwesomeIcon
                icon={faUserCheck}
                className="text-2xl"
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
              />
            </NavLink>

            <div
              className={`dropdown submenuUser bg-white ${
                open ? "active" : "inactive"
              }`}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="">
                <DropdownItem
                  icon={<FaRegUserCircle />}
                  name="Profile"
                  onClick={hanldeProfile}
                />
                {/* <DropdownItem
                  icon={<FaRegUserCircle />}
                  name="Profile"
                  onClick={hanldeProfile2}
                /> */}
                {username === "admin" && (
                  <DropdownItem
                    icon={<RiAdminFill />}
                    name="Admin"
                    onClick={hanldeAdminPage}
                  />
                )}
                <DropdownItem
                  icon={<RiLogoutBoxLine />}
                  name="Logout"
                  onClick={handleLogout}
                />
              </ul>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex  md:items-center bg-red-600 hover:bg-gray-600 text-white font-bold rounded-md mr-[3.5%] ml-[2%] justify-center w-[150px] h-[40px] cursor-pointer">
            <NavLink
              to="/Login"
              activeClassName="hidden "
              onClick={handleLoginClick}
            >
              <span className="mx-auto">Đăng Nhập</span>
            </NavLink>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

function DropdownItem({ icon, name, onClick }) {
  return (
    <li
      className="flex flex-row items-center gap-[10px] cursor-pointer"
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {name && <span>{name}</span>}
    </li>
  );
}

export default Nav;
