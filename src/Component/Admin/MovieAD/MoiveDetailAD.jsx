import React from "react";

const MovieDetailAD = ({ movie, typedata, categorydata }) => {
  return (
    <div
      className="relative h-[650px] font-semibold capitalize bg-white p-4 z-20 w-[850px] rounded text-black overflow-y-auto"
      key={movie.movieid}
    >
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Tên phim</p>
        <p className="w-full text-gray-600">{movie.moviename}</p>
      </div>
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Tên khác</p>
        <p className="w-full text-gray-600">{movie.moviesubname}</p>
      </div>
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Mô tả</p>
        <p className="w-full text-gray-600">{movie.moviedescribe}</p>
      </div>
      <div className="flex flex-row justify-between border-b-2 mb-2 pb-2">
        <div className="">
          <p className="font-bold">Studio</p>
          <p className="w-full text-gray-600">{movie.author}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Năm phát hành</p>
          <p className="w-full text-gray-600">{movie.release_year}</p>
        </div>
        <div className="">
          <p className="font-bold">Thời lượng</p>
          <p className="w-full text-gray-600">{movie.time}</p>
        </div>

        <div className="">
          <p className="font-bold">Số tập</p>
          <p className="w-full text-gray-600">{movie.episodes}</p>
        </div>
        <div className="">
          <p className="font-bold">Lượt xem</p>
          <p className="w-full text-gray-600">{movie.views}</p>
        </div>
      </div>
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Thể loại</p>
        <div className="flex-wrap flex mt-1">
          {typedata &&
            typedata.map((type) => (
              <div
                key={type.typeid}
                className=" text-black mr-2"
              >
                {type.typename},
              </div>
            ))}
        </div>
      </div>
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Danh mục</p>
        <div className="flex-wrap flex mt-1">
          {categorydata &&
            categorydata.map((category) => (
              <div
                key={category.categoryid}
                className=" text-black mr-2"
              >
                {category.categoryname}
              </div>
            ))}
        </div>
      </div>
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Đường dẫn</p>
        <p className="w-full text-gray-600">{movie.movieurl}</p>
      </div>
      <div className="border-b-2 mb-2 pb-2">
        <p className="font-bold">Trailer</p>
        <p className="w-full text-gray-600">{movie.trailerurl}</p>
      </div>
      <div className="tabel table-fixed">
        <div className="table-cell pr-[20px]">
          <p className="font-bold">Poster</p>
          <img
            src={`${process.env.REACT_APP_API_URL}/upload/poster/${movie.poster}`}
            alt="?"
            className="w-[150px]  rounded"
          />
        </div>
        <div className="table-cell">
          <p className=" font-bold">Background</p>
          <img
            src={`${process.env.REACT_APP_API_URL}/upload/background/${movie.background}`}
            alt="?"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailAD;
