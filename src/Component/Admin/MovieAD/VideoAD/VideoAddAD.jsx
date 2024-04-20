import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoAddAD = ({ movieid, handleCloseSelected }) => {
  const [videoname, setvideoname] = useState();
  const [urlserver, seturlserver] = useState();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/phim/${movieid}`
      );
      setData(response.data.movies);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [movieid]);

  const handleSubmit = async () => {
    try {
      const requestData = {
        videoname: videoname,
        urlserver: urlserver,
        movieid: movieid,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/video/add`,
        requestData
      );
      if (response.data.message) {
        // Nếu có, hiển thị thông báo thành công
        alert(response.data.message);
        handleCloseSelected();
      } else {
        // Nếu không, hiển thị thông báo thất bại
        alert("Thêm dữ liệu vào SQL thất bại.");
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi thêm dữ liệu vào SQL: ", error);
      alert("Đã xảy ra lỗi khi thêm dữ liệu vào SQL.");
    }
  };

  return (
    <div className="relative font-semibold capitalize w-[550px] text-[15px] bg-white p-4 z-20 rounded text-black overflow-y-auto">
      {data &&
        data.map((movie) => (
          <div className="flex mb-3">
            <img
              src={`${process.env.REACT_APP_API_URL}/upload/poster/${movie.poster}`}
              alt="?"
              className="w-[100px] mr-[10px]"
            />
            <div className="flex flex-col mb-4">
              <p className="font-bold mr-2 text-[18px] mb-2 text-lime-500">
                {movie.moviename}
              </p>
              <p className="font-bold mr-2 text-gray-600">
                {movie.moviesubname}
              </p>
            </div>
          </div>
        ))}
      <span className="text-black">Preview</span>
      <div className="mb-[20px] pt-[55%] w-full relative">
        <div className="block">
          <iframe
            title="Video Player"
            width="560"
            height="315"
            className="absolute w-full h-full top-0 left-0 rounded"
            src={`${urlserver}`}
            frameborder="0"
            allowfullscreen=""
          ></iframe>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[350px]">
          <div className="border-b-2 mb-2 flex">
            <p className="font-bold whitespace-nowrap mr-2">TẬP: </p>
            <input
              className="w-full text-gray-600 mb-2"
              placeholder="Số..."
              value={videoname}
              onChange={(e) => setvideoname(e.target.value)}
            />
          </div>
          <div className="border-b-2 mb-2 flex">
            <p className="font-bold whitespace-nowrap mr-2">URL: </p>
            <input
              className="w-full text-gray-600 mb-2"
              placeholder="Link video..."
              value={urlserver}
              onChange={(e) => seturlserver(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Thêm tập phim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAddAD;
