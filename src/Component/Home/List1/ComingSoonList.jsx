import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";
import MovieBox from "../../Detail/MovieBox";
import Loading1 from "../../Loading/Loading1";

const ComingSoonList = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/sap-chieu`
        );
        const sortedMovies = response.data.movies.slice(0, 10);
        setMovieData(sortedMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-[10px] w-full">
      <div className="w-full flex text-[19px] pb-[10px] items-center">
        <div className="bg-[#A3182A] text-white flex items-center h-[40px] px-[10px] mb-3 rounded">
          PHIM SẮP CHIẾU
          <FaChevronRight className="text-[15px] ml-[10px]" />
        </div>
      </div>
      <div>
        <div className="flex w-full">
          <ul className="flex w-full flex-wrap relative lg:left-[-10px]">
            {movieData.length > 0 ? (
              movieData.map((movie) => (
                <MovieBox key={movie.movieid} movie={movie} />
              ))
            ) : (
              <div className="h-[600px] flex w-full items-center">
                <Loading1 />
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="text-white w-full text-[25px] flex justify-center pr-[20px]">
        <Link to="/sap-chieu" className="bg-[#161E21] w-full py-1 ">
          <button className="bg-[#161E21] w-full font-sans hover:opacity-50">
            Xem Thêm..
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoonList;
