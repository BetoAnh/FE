import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import axios from "axios";
import VideoAddAD from "./VideoAddAD";
import VideoSelectAD from "./VideoSelectAD";

const VideoList = ({ movieid }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCloseSelected = () => {
    setSelectedVideo(false);
    setSelected(0);
    fetchData();
  };

  const handleAdd = async (e) => {
    setSelectedVideo(true);
    setSelected(1);
  };

  const handleSelect = async (videoid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/video/select/${videoid}`
      );
      setSelectedVideo(response.data.videos);
      setSelected(2);
    } catch (error) {
      console.error("Error getting video details: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [movieid]); // Đặt movieid vào dependency array để useEffect chạy lại mỗi khi movieid thay đổi

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/video/${movieid}`
      );
      setData(response.data.videos);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Sử dụng useMemo để lưu trữ danh sách video và render lại chỉ khi có sự thay đổi trong data
  const videoButtons = useMemo(() => {
    return data.map((video) => (
      <button
        key={video.videoid}
        className="py-1 px-2 rounded bg-green-300 hover:bg-green-400"
        onClick={() => handleSelect(video.videoid)}
      >
        {video.videoname}
      </button>
    ));
  }, [data]);

  return (
    <>
      <div className="flex flex-wrap gap-2 my-1">
        <button
          className="bg-gray-300 py-1 px-2 flex justify-center items-center rounded gap-1 hover:bg-gray-400"
          onClick={handleAdd}
        >
          <AiOutlineVideoCameraAdd />
          Tập Mới
        </button>
        {videoButtons}
      </div>
      <div
        className={`fixed w-full h-full top-0 left-0 z-20 flex items-center justify-center thanhbar ${
          selectedVideo ? "block" : "hidden"
        }`}
      >
        <div className="absolute w-full h-full bg-black opacity-50" />
        <div className="relative bg-transparent">
          {selected == 2 &&
            selectedVideo &&
            selectedVideo.map((video) => (
              <VideoSelectAD
                key={video.videoid}
                video={video}
                handleCloseSelected={handleCloseSelected}
              />
            ))}
          {selected == 1 && selectedVideo && (
            <VideoAddAD
              movieid={movieid}
              handleCloseSelected={handleCloseSelected}
            />
          )}
          {/* {selected == 3 &&
            selectedMovie &&
            selectedMovie.map((movie) => (
              <MovieEditAD
                key={movie.movieid}
                movie={movie}
                typedata={typedata}
                categorydata={categorydata}
                handleCloseSelected={handleCloseSelected}
              />
            ))} */}
          <button
            className="absolute top-0 -right-10 text-[35px] z-20 text-white rounded hover:text-orange-600"
            onClick={handleCloseSelected}
          >
            <VscError />
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoList;
