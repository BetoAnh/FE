import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar, FaRegClock, FaUser } from "react-icons/fa";
import { AiFillVideoCamera } from "react-icons/ai";
import { MdMovie } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.scss";
import axios from "axios";
import Loading1 from "../../Loading/Loading1";

const Slider1 = () => {
  const [movieData, setMovieData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/noi-bat`
        );
        setMovieData(response.data.movies);
        setTypeData(response.data.types);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const Notification = () => {
    alert("Clm bình tĩnh đi đã làm đâu");
  };
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: (i) => (
      <li key={i}>
        <div
          className={`${styles.dot} ${
            activeDotIndex === i ? styles.active : ""
          }`}
          onClick={() => handleDotClick(i)}
        />
      </li>
    ),

    beforeChange: (current, next) => {
      handleDotClick(next);
      setCurrentSlide(next);
    },
  };

  const handleDotClick = (index) => {
    setActiveDotIndex(index);
    setCurrentSlide(index);
  };

  return (
    <>
      {movieData.length > 0 ? (
        <Slider {...settings}>
          {movieData.map((movie, index) => {
            return (
              <div
                className="relative overflow-hidden rounded h-[500px] "
                key={index}
              >
                <div className="bg-black absolute top-[-10px] left-[-10px] blur opacity-60 w-[60%] h-[110%] flex px-[20px] py-[10px] flex-col" />

                <div className=" absolute top-0 left-0  w-[60%] h-[100%] flex px-[20px] py-[10px] flex-col">
                  {/*NAME*/}
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    className="w-[100%]"
                  >
                    <div className="text-white text-[35px] font-semibold line-clamp-2 leading-10 capitalize pb-1">
                      {movie && movie.moviename}
                    </div>
                  </a>
                  <div className=" text-[20px] flex flex-col ">
                    <div className="flex flex-row">
                      {/*STAR*/}
                      <div className="text-[#B5E745] flex flex-row items-center mr-[50px] text-[17px] py-[5px]">
                        <FaStar className="  text-[17px] flex mr-[2px]" />
                        <span>
                          {movie && movie.average_rating
                            ? movie.average_rating
                            : "0"}
                        </span>
                      </div>

                      {/*DATE*/}
                      <div className="text-white flex flex-row flex-1 items-center text-[17px] py-[5px]">
                        <FaRegClock className="text-[17px] flex mr-[5px]" />
                        <span>
                          {movie && movie.release_year
                            ? movie.release_year
                            : "9999"}
                        </span>
                      </div>
                    </div>

                    {/*INTRO*/}
                    <div className="text-white flex flex-row items-center py-[5px]">
                      <div className="line-clamp-2 text-[#D8D6D6] font-semibold text-[17px]">
                        {movie && movie.moviedescribe}
                      </div>
                    </div>

                    {/*STUDIO*/}
                    <div className="text-white font-semibold flex flex-row items-center py-[5px]">
                      <AiFillVideoCamera className=" text-[#B5E745] flex-none text-[20px] mr-[6px] " />
                      <p className="truncate flex-grow text-[15px] text-[#D8D6D6]">
                        Studio:{" "}
                        <span className=" text-white capitalize">
                          {movie && movie.author ? movie.author : "Null"}
                        </span>
                      </p>
                    </div>

                    {/*CATEGORY*/}
                    <div className="text-white font-semibold flex flex-row items-center py-[5px]">
                      <MdMovie className=" text-[#B5E745] flex-none text-[20px] mr-[6px]" />
                      <p className="truncate flex-grow text-[15px] text-[#D8D6D6]">
                        Thể loại:
                        {typeData
                          .filter((type) => type.movieid === movie.movieid)
                          .map((type) => (
                            <a
                              className="a"
                              key={type.typeid}
                              href={`/the-loai/${type.typeurl}`}
                            >
                              <span key={type.movieid} className=" text-white">
                                {" "}
                                {type.typename},
                              </span>
                            </a>
                          ))}
                        {typeData.filter(
                          (type) => type.movieid === movie.movieid
                        ).length === 0 && (
                          <span className=" text-white"> Null</span>
                        )}
                      </p>
                    </div>

                    <div className=" flex flex-row flex-1 items-center my-[5px]">
                      {Array(5)
                        .fill()
                        .map((_, index) => (
                          <div
                            key={index}
                            className="flex bg-[#1a1616] rounded-full p-[10px] justify-center items-center mr-[10px]"
                          >
                            <FaUser className="text-white text-[25px]" />
                          </div>
                        ))}
                    </div>
                    <button className="bg-red-500 flex w-[200px] justify-center rounded-[10px] px-[20px] py-[10px] mt-[20px]">
                      <a
                        href={`/phim/${movie.movieurl}-a${movie.movieid}`}
                        className="flex flex-row items-center"
                      >
                        <FaPlay className="text-white mr-[15px]" />
                        <div className=" flex flex-1 text-white font-bold ">
                          Xem phim
                        </div>
                      </a>
                    </button>
                  </div>
                </div>
                <img
                  src={`${process.env.REACT_APP_API_URL}/upload/background/${movie.background}`}
                  alt={`Slide ${index + 1}`}
                  className=" w-[100%] h-[100%] object-cover"
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="h-[500px] flex items-center">
          <Loading1 />
        </div>
      )}
    </>
  );
};

export default Slider1;
