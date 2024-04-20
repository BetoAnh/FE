import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieBox from "../../Detail/MovieBox";
import Loading1 from "../../Loading/Loading1";

const NewList = ({ id }) => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/${id}`
        );
        const sortedMovies = response.data.movies.slice(0, 10);
        setMovieData(sortedMovies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
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
  );
};

export default NewList;
