import React, { useState } from "react";
import "./Detail.css";
import { FaStar } from "react-icons/fa";
import { PiPlayCircleThin } from "react-icons/pi";
const MovieBox = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li key={movie.movieid} className="w-1/5 mb-5 px-[10px]">
      <a
        className="flex-col w-full"
        href={`/phim/${movie.movieurl}-a${movie.movieid}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <div className="relative w-full h-full">
          <div className="img-moviebox">
            <img
              className="absolute top-0 left-0 w-full h-full object-cover rounded"
              src={`${process.env.REACT_APP_API_URL}/upload/poster/${movie.poster}`}
              alt="Movie Avatar"
            />
            <div className={`play-overlay ${isHovered ? "animate-fadeIn" : "animate-fadeOut"}`}>
              <div className=" blur bg-black bg-opacity-40 rounded-[50%]">
                <PiPlayCircleThin className="text-white text-6xl" />
              </div>
              <PiPlayCircleThin
                className={`text-white text-7xl absolute ${
                  isHovered ? "animate-zoomIn" : "animate-zoomOut"
                }`}
              />
            </div>
          </div>
          <h2 className="text-white capitalize font-semibold flex justify-center">
            <span className="truncate">{movie.moviename}</span>
          </h2>
          <span className="text-[#7D7D7D] flex justify-center text-[13px] font-semibold">
            Lượt xem: {movie.views}
          </span>
          {movie.videoname ? (
            <div className="absolute top-1 right-1 ">
              <div className="relative w-[70px] h-[60px] flex flex-col justify-center items-center rounded-[50%] font-semibold text-white">
                <p className="mt-[2px] text-[10px] z-20">TẬP</p>
                <p className="mt-[-8px] font-bold text-[20px] z-20">
                  {movie.videoname}
                </p>
                <img
                  className="absolute z-0"
                  src="../../img/—Pngtree—explosion sticker red blast sticker_39456252.png"
                />
              </div>
            </div>
          ) : (
            <div className={`absolute bottom-[50%] w-full flex bg-[#AA2121] justify-center ${isHovered ? "animate-fadeOut" : "animate-fadeIn"}`}>
              <p className="text-white px-4 py-1 font-semibold text-[18px]">
                Sắp chiếu
              </p>
            </div>
          )}
          <div className="text-[#F5EC42] text-[15px] font-semibold flex items-center absolute top-1 left-1 bg-black py-1 px-3 bg-opacity-80 rounded-full">
            <FaStar />
            <span className="z-20">
              {movie.average_rating !== null ? movie.average_rating : 0}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
};

export default MovieBox;
