import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header&Footer/Header/Header";
import Notification from "../Home/Notification/Nontification";
import Footer from "../Header&Footer/Footer/Footer";
import Righter from "../Header&Footer/Righter/Righter";
import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";
import { MdVideoCall } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { FaRegCircleDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import { FacebookProvider, Comments } from "react-facebook";
import {
  MdBookmarkRemove,
  MdOutlineBookmarkAdd,
  MdBookmarkAdded,
} from "react-icons/md";
import Rating from "./Rating/Rating";
import "./Detail.css";
import axios from "axios";
import Cookies from "js-cookie";
import Loading1 from "../Loading/Loading1";

const MovieDetail = () => {
  const { url } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const id = url.split("-a").pop();
  const [movieId, setMovieId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const add = async () => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/follow/add/${id}`, null, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const isFollow = response.data.isFollow;
          if (response.status === 200) {
            setActive(isFollow);
            window.location.reload();
            // alert("Đã thêm vào danh sách yêu thích");
            //   alert("Đã thêm vào danh sách yêu thích");
            // } else {
            // Xử lý lỗi nếu cần
          } else {
            setActive(isFollow);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Swal.fire({
        title: "Bạn phải đăng nhập trước khi theo dõi phim!",
        icon: "warning",
        showCancelButton: true, // Hiển thị nút "Cancel"
        confirmButtonText: "OK",
        cancelButtonText: "Cancel", // Đặt văn bản cho nút "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          window.scrollTo(0, 0);
          navigate("/login");
        }
      });
    }
  };

  const del = async () => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/follow/del/${id}`, null, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          const isFollow = response.data.isFollow;
          if (response.status === 200) {
            setActive(isFollow);
            window.location.reload();
            // alert("Đã xóa khỏi danh sách yêu thích");
            //   alert("Đã thêm vào danh sách yêu thích");
            // } else {
            // Xử lý lỗi nếu cần
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (movieId && storedToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/follow/${movieId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(function (response) {
          const isFollow = response.data.isFollow;
          if (response.status === 200) {
            setActive(isFollow);
            console.log("Data lấy được: " + response.data);
          }
        })
        .catch(function (error) {
          console.log("Không lấy được data từ sql: " + error);
          // navigate("/not-found");
        });
    }
  }, [movieId]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/phim/${id}`)
      .then(function (response) {
        console.log(response.data);
        setMovieData(response.data.movies);
        setTypeData(response.data.types);
        setCategoryData(response.data.categories);
        setVideoData(response.data.videos);
        const movieUrl = response.data.movies[0].movieurl;
        navigate(`/phim/${movieUrl}-a${id}`);
        setMovieId(id);
      })
      .catch(function (error) {
        console.log(error);
        navigate("/not-found");
      });
  }, [id, navigate]);

  return (
    <div className="bg-[#263238]">
      <Header />
      <div className="bg-[#253238] flex justify-center w-full ">
        <div className="w-full md:max-w-[1280px] justify-center rounded flex-col bg-[#141414] p-[20px] mt-[100px] xl:mt-[120px] xl:rounded">
          <Notification />
          <div className="table table-fixed w-full">
            <main className="pt-[20px] w-full lg:table-cell lg:pr-[20px] flex-row">
              {movieData.length > 0 ? (
                movieData.map((movie) => (
                  <>
                    <article
                      key={movie.id}
                      className="bg-cover min-h-[300px] bg-center bg-no-repeat rounded p-5 relative z-1 w-auto"
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_API_URL}/upload/background/${movie.background})`,
                      }}
                    >
                      <header className="relative z-10 md:pl-[200px] md:flex-raw text-center md:text-justify">
                        <h1 className="text-[#B5E745] text-[35px] font-semibold md:truncate">
                          {movie.moviename}
                        </h1>
                        <h2 className="text-white text-[20px] font-semibold md:truncate pb-2">
                          {movie.moviesubname}
                        </h2>
                        <div className="md:absolute relative md:top-0 md:left-0 flex justify-center ">
                          <img
                            className="w-[180px] h-[260px] object-cover rounded"
                            src={`${process.env.REACT_APP_API_URL}/upload/poster/${movie.poster}`}
                            alt="Movie Avatar"
                          />
                          <div className="text-[25px] absolute top-2 md:left-2 rounded">
                            <div className="absolute opacity-60 bg-black w-full h-full z-5 rounded"></div>
                            <div className="relative z-10 p-1">
                              {!active ? (
                                <div
                                  className="flex flex-row items-center cursor-pointer"
                                  onClick={add}
                                >
                                  <MdOutlineBookmarkAdd className="fill-blue-500 mr-[5px]" />
                                  <p className="text-[14px] text-white font-semibold mr-[3px]">
                                    {" "}
                                    Theo dõi
                                  </p>
                                </div>
                              ) : (
                                <div
                                  className="flex flex-row items-center "
                                  onMouseEnter={handleMouseEnter}
                                  onMouseLeave={handleMouseLeave}
                                >
                                  {isHovered ? (
                                    <div
                                      onClick={del}
                                      className=" flex flex-row items-center cursor-pointer"
                                    >
                                      <MdBookmarkRemove className="fill-blue-500 mr-[5px]" />
                                      <p className="text-[14px] text-white font-semibold mr-[3px]">
                                        Bỏ theo dõi
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      onClick={del}
                                      className=" flex flex-row items-center cursor-pointer"
                                    >
                                      <MdBookmarkAdded className="fill-blue-500  mr-[5px]" />
                                      <p className="text-[14px] text-white font-semibold mr-[3px]">
                                        Đã theo dõi
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="thanhbar2 w-full">
                          <div className="text-[#C0BBBD] font-semibold h-[100px] thanhbar2 overflow-y-auto mb-[10px] pr-2">
                            {movie.moviedescribe}
                          </div>
                        </div>
                      </header>
                      <footer className="relative flex items-center z-10 xl:ml-[200px] xl:mt-0 mt-[100px] pt-5 border-gray-400 bg-transparent border-t-[1px] ">
                        <div className=" border-gray-400 border-r-[1px] pr-[50px] w-auto">
                          <Rating movieId={movie.movieid} />
                        </div>
                        <div className="flex justify-center w-full">
                          <p className="flex items-center text-white font-semibold text-[14px] ml-[17px]">
                            <FaRegClock className="text-[#999C9A] mr-1" />
                            <span className="mr-4">{movie.time}</span>
                            <FaRegCalendarAlt className="text-[#999C9A] mr-1" />
                            <span className="mr-4">{movie.release_year}</span>
                            <BsFillEyeFill className="text-[#999C9A] mr-1" />
                            <span className="mr-4">{movie.views} Lượt Xem</span>
                          </p>
                        </div>
                      </footer>
                      <div className="absolute inset-0 bg-black opacity-65 rounded"></div>
                    </article>
                    <div className="bg-[#1F282D] w-full rounded">
                      <div className="bg-[#141414] w-full px-[10px] pt-[20px] mb-[20px] flex relative">
                        <div
                          className={`px-[3px] cursor-pointer font-semibold text-[15px] flex pb-[20px] mr-[40px] relative mb-[-1px] ${
                            activeTab === 0
                              ? "border-[#B5E745] border-b-4 text-[#B5E745] arrow-down"
                              : "text-white"
                          }`}
                          onClick={() => handleTabClick(0)}
                        >
                          <HiDocumentText
                            className={`text-[25px] duration-200 ease-in-out mr-2 ${
                              activeTab === 0
                                ? "text-[#B5E745]"
                                : "text-[#878A8B]"
                            }`}
                          />
                          Thông tin phim
                        </div>
                        <div
                          className={`px-[3px] cursor-pointer font-semibold text-[15px] flex pb-[20px] mr-[40px] relative mb-[-1px] ${
                            activeTab === 1
                              ? "border-[#B5E745] border-b-4 text-[#B5E745] arrow-down"
                              : "text-white"
                          }`}
                          onClick={() => handleTabClick(1)}
                        >
                          <MdVideoCall
                            className={`duration-200 ease-in-out text-[25px] mr-2 ${
                              activeTab === 1
                                ? "text-[#B5E745]"
                                : "text-[#878A8B]"
                            }`}
                          />
                          Trailer
                        </div>
                        <div
                          className={`px-[3px] cursor-pointer font-semibold text-[15px] flex pb-[20px] mr-[40px] relative mb-[-1px] ${
                            activeTab === 2
                              ? "border-[#B5E745] border-b-4 text-[#B5E745] arrow-down"
                              : "text-white"
                          }`}
                          onClick={() => handleTabClick(2)}
                        >
                          <IoMdPhotos
                            className={`duration-200 ease-in-out text-[25px] mr-2 ${
                              activeTab === 2
                                ? "text-[#B5E745]"
                                : "text-[#878A8B]"
                            }`}
                          />
                          Hình ảnh
                        </div>
                      </div>
                      <div
                        className={`px-[20px] pb-[20px] text-[#D7D7D7] ${
                          activeTab === 0 ? "flex animate-zoomIn" : "hidden"
                        }`}
                      >
                        <div className="float-left w-[48%] mr-[2%] relative">
                          <ul className="text-[15px]">
                            <li className="relative flex pl-[20px] py-[5px] whitespace-nowrap overflow-hidden">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">Tập mới:</strong>
                              &nbsp;
                              {videoData.slice(0, 4).map((video) => (
                                <div
                                  className="bg-[#B5E745] text-white rounded mr-[5px] mt-[-3px]"
                                  key={video.videoid}
                                >
                                  <a
                                    href={`/phim/${url}/tap-${video.videoname}-${video.videoid}`}
                                  >
                                    <div className=" hover:bg-[#B5E745] hover:text-[#4C4C4C] font-semibold capitalize bg-[#4C4C4C] m-[1px] px-[7px] py-[2px]  text-white rounded">
                                      {video.videoname}
                                    </div>
                                  </a>
                                </div>
                              ))}
                            </li>
                            <li className="relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">Thể loại:</strong>
                              &nbsp;
                              {typeData.map((type) => (
                                <a
                                  className="text-[#B5E745] a"
                                  key={type.typeid}
                                  href={`/the-loai/${type.typeurl}`}
                                >
                                  {type.typename},{" "}
                                </a>
                              ))}
                            </li>
                            <li className="relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">Danh mục:</strong>
                              &nbsp;
                              {categoryData.map((categories) => (
                                <a
                                  className="text-[#B5E745] a"
                                  key={categories.categoryid}
                                  href={`/danh-muc/${categories.categoryurl}`}
                                >
                                  {categories.categoryname},{" "}
                                </a>
                              ))}
                            </li>
                            <li className="relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">Đạo diễn:</strong>
                              &nbsp;{movie.author}
                            </li>

                            <li className="relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">
                                Số người theo dõi:
                              </strong>
                              &nbsp;
                              {movie.count_follow ? movie.count_follow : 0}
                            </li>
                          </ul>
                        </div>
                        <div className="float-left w-[50%]">
                          <ul className="text-[15px]">
                            <li className="flex relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">Số tập:</strong>
                              &nbsp;{movie.episodes}
                            </li>
                            <li className="flex relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">
                                Thời lượng:
                              </strong>
                              &nbsp;{movie.time}
                            </li>
                            <li className="flex relative pl-[20px] py-[5px]">
                              <FaRegCircleDot className="absolute text-[#B5E745] left-0 top-[8px]" />
                              <strong className="text-white">
                                Năm phát hành:
                              </strong>
                              &nbsp;{movie.release_year}
                            </li>
                          </ul>
                        </div>
                        <div></div>
                      </div>
                      <div
                        className={`px-[20px] ${
                          activeTab === 1 ? "flex animate-zoomIn" : "hidden"
                        }`}
                      >
                        <div className="mb-[20px] pt-[50%] w-full relative ">
                          <div className="block">
                            <iframe
                              width="560"
                              height="315"
                              className="absolute w-full h-full top-0 left-0 rounded"
                              src={`${movie.trailerurl}`}
                              frameborder="0"
                              allowfullscreen=""
                            ></iframe>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`px-[20px] ${
                          activeTab === 2 ? "flex animate-zoomIn" : "hidden"
                        }`}
                      >
                        <div className="mb-[20px] w-full relative">
                          <div className="block">
                            <img
                              className=" w-full bg-cover rounded"
                              src={`${process.env.REACT_APP_API_URL}/upload/background/${movie.background}`}
                            ></img>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white mt-[20px] rounded">
                      <FacebookProvider appId="265046719974622">
                        <Comments
                          href={`http://26.227.56.79:3000/phim/commentfacebook/${movie.movieid}`}
                          width="100%"
                          numPosts={5}
                          locale="vi_VN"
                        />
                      </FacebookProvider>
                    </div>
                  </>
                ))
              ) : (
                <div className="pt-[100px]">
                  <Loading1 />
                </div>
              )}
            </main>

            <aside className=" lg:table-cell align-top lg:w-[300px] w-full">
              <Righter />
            </aside>
          </div>
        </div>
      </div>
      <div className="w-full xl:mt-[20px] flex justify-center h-full">
        <Footer />
      </div>
    </div>
  );
};

export default MovieDetail;
