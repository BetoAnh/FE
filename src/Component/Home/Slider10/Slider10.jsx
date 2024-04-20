import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  TbArrowBigRightLinesFilled,
  TbArrowBigLeftLinesFilled,
} from "react-icons/tb";
import axios from "axios";
import MovieBox2 from "../../Detail/MovieBox2";
import Loading1 from "../../Loading/Loading1";

const Slider10 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const Notification = () => {
    alert("Clm bình tĩnh đi đã làm đâu");
  };
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  const CustomPrevArrow = (props) => {
    return (
      <div
        className="bg-red-500 text-white flex absolute bottom-[50%] translate-y-[50%] left-[6px] w-[35px] rounded-full h-[35px] items-center justify-center z-10 cursor-pointer"
        onClick={props.onClick}
      >
        <TbArrowBigLeftLinesFilled />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    return (
      <div
        className="bg-red-500 text-white flex absolute bottom-[50%] translate-y-[50%] right-[6px] w-[35px] h-[35px] rounded-full items-center justify-center z-10 cursor-pointer"
        onClick={props.onClick}
      >
        <TbArrowBigRightLinesFilled />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    swipe: true,
    swipeToSlide: true,
    initialSlide: currentSlide,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 830,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
    afterChange: (slideIndex) => {
      setCurrentSlide(slideIndex);
      setIsPaused(false);
    },
  };

  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/phim-moi`
        );
        const sortedMovies = response.data.movies.slice(0, 17);
        setMovieData(sortedMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {movieData.length > 0 ? (
        <Slider {...settings} className="">
          {movieData.map((movie) => (
            <MovieBox2 key={movie.movieid} movie={movie} />
          ))}
        </Slider>
      ) : (
        <div className="h-[200px] flex items-center">
          <Loading1 />
        </div>
      )}
    </>
  );
};

export default Slider10;
