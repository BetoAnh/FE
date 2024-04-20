import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header&Footer/Header/Header";
import Notification from "../Home/Notification/Nontification";
import Footer from "../Header&Footer/Footer/Footer";
import Righter from "../Header&Footer/Righter/Righter";
import MovieBox from "../Detail/MovieBox";
import Loading1 from "../Loading/Loading1";

const NewMovie = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(15);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/phim-moi`
        );
        setMovieData(response.data.movies);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const smoothScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    const targetScrollPosition = scrollRef.current.offsetTop;
    const distance = targetScrollPosition - currentScrollPosition;
    const duration = 500;
    const startTime = performance.now();
    const scrollStep = (timestamp) => {
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
  const easeOutQuart = (t) => 1 - --t * t * t * t;

  useEffect(() => {
    setCurrentPage(parseInt(page, 10) || 1);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    smoothScroll();
    navigate(`/phim-moi/${pageNumber}`);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieData.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className="bg-[#263238]">
      <Header />
      <div className="bg-[#253238] flex  justify-center">
        <div className="w-[1280px] justify-center flex-col bg-[#141414] p-[20px] mt-[100px] xl:mt-[120px] xl:rounded">
          <Notification />
          <div className="w-full table table-fixed">
            <div
              ref={scrollRef}
              className="w-full lg:table-cell flex-row bg-[#141414]"
            >
              <div className="flex w-full justify-center mt-4 mb-4 relative lg:left-[-10px]">
                {movieData.length > 0 ? (
                  movieData.length > moviesPerPage && (
                    <nav className="w-full">
                      <ul className="pagination w-full flex justify-center">
                        <li className="page-item bg-[#212527] w-auto h-[40px] rounded flex justify-center items-center m-1 text-[#78909C] font-bold p-3">
                          Trang {currentPage} của{" "}
                          {Math.ceil(movieData.length / moviesPerPage)}
                        </li>
                        <li
                          className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                        >
                          <button className="page-link">Trang Đầu</button>
                        </li>
                        {Array.from(
                          {
                            length: Math.min(
                              4,
                              Math.ceil(movieData.length / moviesPerPage)
                            ),
                          },
                          (_, index) => {
                            const totalPages = Math.ceil(
                              movieData.length / moviesPerPage
                            );
                            if (
                              currentPage > totalPages - 3 &&
                              totalPages > 4
                            ) {
                              const pageNumber = totalPages - 4 + index + 1;
                              return (
                                <li
                                  className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                                  key={index}
                                >
                                  <button
                                    className={`page-link rounded w-full ${
                                      currentPage === pageNumber
                                        ? "active bg-[red] text-white"
                                        : ""
                                    }`}
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
                                    className={`page-link rounded w-full ${
                                      currentPage === pageNumber
                                        ? "active bg-[red] text-white"
                                        : ""
                                    }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                  >
                                    {pageNumber}
                                  </button>
                                </li>
                              );
                            }
                            const pageNumber =
                              currentPage > 2
                                ? currentPage - 1 + index
                                : index + 1;
                            return (
                              <li
                                className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                                key={index}
                              >
                                <button
                                  className={`page-link rounded w-full ${
                                    currentPage === pageNumber
                                      ? "active bg-[red] text-white"
                                      : ""
                                  }`}
                                  onClick={() => handlePageChange(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              </li>
                            );
                          }
                        )}
                        <li
                          className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                          onClick={() =>
                            handlePageChange(
                              Math.ceil(movieData.length / moviesPerPage)
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(movieData.length / moviesPerPage)
                          }
                        >
                          <button className="page-link">Trang Cuối</button>
                        </li>
                      </ul>
                    </nav>
                  )
                ) : (
                  <div className="p-10">
                    <Loading1 />
                  </div>
                )}
              </div>
              <div className="flex w-full">
                <ul className="flex w-full flex-wrap relative lg:left-[-10px]">
                  {currentMovies.map((movie) => (
                    <MovieBox key={movie.movieid} movie={movie} />
                  ))}
                </ul>
              </div>
              <div className="flex w-full justify-center relative lg:left-[-10px]">
                {movieData.length > moviesPerPage && (
                  <nav className="w-full">
                    <ul className="pagination w-full flex justify-center">
                      <li className="page-item bg-[#212527] w-auto h-[40px] rounded flex justify-center items-center m-1 text-[#78909C] font-bold p-3">
                        Trang {currentPage} của{" "}
                        {Math.ceil(movieData.length / moviesPerPage)}
                      </li>
                      <li
                        className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      >
                        <button className="page-link">Trang Đầu</button>
                      </li>
                      {Array.from(
                        {
                          length: Math.min(
                            4,
                            Math.ceil(movieData.length / moviesPerPage)
                          ),
                        },
                        (_, index) => {
                          const totalPages = Math.ceil(
                            movieData.length / moviesPerPage
                          );
                          if (currentPage > totalPages - 3 && totalPages > 4) {
                            const pageNumber = totalPages - 4 + index + 1;
                            return (
                              <li
                                className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                                key={index}
                              >
                                <button
                                  className={`page-link rounded w-full ${
                                    currentPage === pageNumber
                                      ? "active bg-[red] text-white"
                                      : ""
                                  }`}
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
                                  className={`page-link rounded w-full ${
                                    currentPage === pageNumber
                                      ? "active bg-[red] text-white"
                                      : ""
                                  }`}
                                  onClick={() => handlePageChange(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              </li>
                            );
                          }
                          const pageNumber =
                            currentPage > 2
                              ? currentPage - 1 + index
                              : index + 1;
                          return (
                            <li
                              className="page-item bg-[#212527] w-[40px] h-[40px] rounded flex justify-center m-1 text-[#78909C] text-[18px] font-bold hover:bg-[#B5E745] hover:text-white"
                              key={index}
                            >
                              <button
                                className={`page-link rounded w-full ${
                                  currentPage === pageNumber
                                    ? "active bg-[red] text-white"
                                    : ""
                                }`}
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            </li>
                          );
                        }
                      )}
                      <li
                        className="page-item bg-[#212527] w-[100px] h-[40px] rounded flex justify-center m-1 text-[#78909C] font-bold hover:bg-[#B5E745] hover:text-white"
                        onClick={() =>
                          handlePageChange(
                            Math.ceil(movieData.length / moviesPerPage)
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(movieData.length / moviesPerPage)
                        }
                      >
                        <button className="page-link">Trang Cuối</button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
            <div className=" lg:table-cell align-top lg:w-[300px] w-full ">
              <Righter />
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

export default NewMovie;
