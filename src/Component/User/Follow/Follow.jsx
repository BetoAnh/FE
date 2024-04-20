import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import Header from '../Header&Footer/Header/Header';
// import Notification from '../Home/Notification/Nontification';
// import Footer from '../Header&Footer/Footer/Footer';
// import Righter from '../Header&Footer/Righter/Righter';
import MovieBox from "../../Detail/MovieBox";

const Follow = () => {
  const [movies, setMovies] = useState([]);
  const { page, type } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);
  const scrollRef = useRef();

  const smoothScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    const targetScrollPosition = scrollRef.current.offsetTop;
    const distance = targetScrollPosition - currentScrollPosition;
    const duration = 500;
    const startTime = performance.now();
    const scrollStep = timestamp => {
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = easeOutQuart(progress);
      window.scrollTo(0, currentScrollPosition + distance * easeProgress);
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    };
    requestAnimationFrame(scrollStep);
  };
  const easeOutQuart = t => 1 - (--t) * t * t * t;

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/api/the-loai/${type}`)
  //     .then(function (response) {
  //       // Handle the data when a successful response is received from the API
  //       console.log(response.data); // Log the data to the console
  //       setMovieData(response.data.movies); // Store the movies array in state
  //     })
  //     .catch(function (error) {
  //       // Handle any errors
  //       console.log(error);
  //     });
  //     window.scrollTo(0, 0);
  // }, [type]);

  useEffect(() => {
    setCurrentPage(parseInt(page, 10) || 1);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // smoothScroll();
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieData.slice(indexOfFirstMovie, indexOfLastMovie);


  const fetchMovies = async () => {
    const storedToken = Cookies.get("token");

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/follow`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (response.status === 200) {

        console.log(response.data);
        setMovieData(response.data.data);
      } else {
        console.log("Không lấy được data!");
      }
    } catch (error) {
      console.error("Error retrieving movies:", error);
    }
  };
  useEffect(() => {

    fetchMovies();
  }, []);

  return (
    <div className="flex w-full text-white flex-col px-[20px]">
      <span className="flex text-[35px] font-semibold items-center ml-[10px] capitalize">Danh sách phim theo dõi</span>
      {/*<div className="flex flex-col ml-[30px]">
        <div>
          <span>Movie</span>
        </div>
        <div>
          {movies.map((movie) => (
            <a className="flex hover:bg-red-500 p-[30px]" href={`/phim/${movie.movieurl}-a${movie.movieid}` }>
              <div key={movie?.followid} >
                {movie.movieid}
              </div>
            </a>
          ))}
        </div>
      </div> */}
      <div ref={scrollRef} className="w-full lg:table-cell flex-row ">
        <div className="flex w-full justify-center  mb-4 relative">
          {movieData.length > moviesPerPage && (
            <nav className="w-full">
              <ul className="pagination w-full flex justify-center">
                <li
                  className="page-item bg-[#212527] w-auto h-[40px] rounded flex justify-center items-center m-1 text-[#78909C] font-bold p-3"
                >
                  Trang {currentPage} của {Math.ceil(movieData.length / moviesPerPage)}
                </li>
                <li
                  className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <button className="page-link">
                    Trang Đầu
                  </button>
                </li>
                {Array.from({ length: Math.min(4, Math.ceil(movieData.length / moviesPerPage)) }, (_, index) => {
                  const totalPages = Math.ceil(movieData.length / moviesPerPage);
                  if (currentPage > totalPages - 3 && totalPages > 4) {
                    const pageNumber = totalPages - 4 + index + 1;
                    return (
                      <li
                        className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                        key={index}
                      >
                        <button
                          className={`page-link rounded w-full ${currentPage === pageNumber ? 'active bg-[red] text-white' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                  if (totalPages <= 4) {
                    const pageNumber = index + 1;
                    return (
                      <li
                        className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                        key={index}
                      >
                        <button
                          className={`page-link rounded w-full ${currentPage === pageNumber ? 'active bg-[red] text-white' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                  const pageNumber = currentPage > 2 ? currentPage - 1 + index : index + 1;
                  return (
                    <li
                      className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                      key={index}
                    >
                      <button
                        className={`page-link rounded w-full ${currentPage === pageNumber ? 'active bg-[red] text-white' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li
                  className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                  onClick={() => handlePageChange(Math.ceil(movieData.length / moviesPerPage))}
                  disabled={currentPage === Math.ceil(movieData.length / moviesPerPage)}
                >
                  <button className="page-link">
                    Trang Cuối
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <div className="flex w-full">
          <ul className="flex w-full flex-wrap relative">
            {currentMovies.map((movie) => (
              <MovieBox key={movie.movieid} movie={movie} />
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-center relative">
          {movieData.length > moviesPerPage && (
            <nav className="w-full">
              <ul className="pagination w-full flex justify-center">
                <li
                  className="page-item bg-[#212527] w-auto h-[40px] rounded flex justify-center items-center m-1 text-[#78909C] font-bold p-3"
                >
                  Trang {currentPage} của {Math.ceil(movieData.length / moviesPerPage)}
                </li>
                <li
                  className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <button className="page-link">
                    Trang Đầu
                  </button>
                </li>
                {Array.from({ length: Math.min(4, Math.ceil(movieData.length / moviesPerPage)) }, (_, index) => {
                  const totalPages = Math.ceil(movieData.length / moviesPerPage);
                  if (currentPage > totalPages - 3 && totalPages > 4) {
                    const pageNumber = totalPages - 4 + index + 1;
                    return (
                      <li
                        className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                        key={index}
                      >
                        <button
                          className={`page-link rounded w-full ${currentPage === pageNumber ? 'active bg-[red] text-white' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                  if (totalPages <= 4) {
                    const pageNumber = index + 1;
                    return (
                      <li
                        className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                        key={index}
                      >
                        <button
                          className={`page-link rounded w-full ${currentPage === pageNumber ? 'active bg-[red] text-white' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                  const pageNumber = currentPage > 2 ? currentPage - 1 + index : index + 1;
                  return (
                    <li
                      className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                      key={index}
                    >
                      <button
                        className={`page-link rounded w-full ${currentPage === pageNumber ? 'active bg-[red] text-white' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li
                  className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                  onClick={() => handlePageChange(Math.ceil(movieData.length / moviesPerPage))}
                  disabled={currentPage === Math.ceil(movieData.length / moviesPerPage)}
                >
                  <button className="page-link">
                    Trang Cuối
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Follow;
