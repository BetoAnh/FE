import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoSelectAD = ({ video, handleCloseSelected }) => {
  const [videoname, setvideoname] = useState(video.videoname || null);
  const [urlserver, seturlserver] = useState(video.urlserver || null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/phim/${video.movieid}`
      );
      setData(response.data.movies);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [video.movieid]);

  const handleUpdate = async () => {
    const confirmUpdate = window.confirm(
      "Bạn có chắc chắn muốn sửa tập phim này?"
    );
    if (confirmUpdate) {
      try {
        const requestData = {
          videoname: videoname,
          urlserver: urlserver,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/video/edit/${video.videoid}`,
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
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa tập phim này?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/admin/video/${video.videoid}`
        );
        if (response.data.message) {
          // Nếu có, hiển thị thông báo thành công
          alert(response.data.message);
          handleCloseSelected();
          fetchData();
        } else {
          // Nếu không, hiển thị thông báo thất bại
          alert("Thêm dữ liệu vào SQL thất bại.");
        } // Sau khi xóa, gọi lại fetchData để cập nhật danh sách phim
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  return (
    <div className="relative font-semibold capitalize w-[550px] text-[15px] bg-white p-4 z-20 rounded text-black overflow-y-auto">
      {data &&
        data.map((movie) => (
          <div className="mb-3 flex">
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
          <div className="w-full flex gap-5 justify-center">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Sửa tập phim
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Xóa tập phim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSelectAD;
