import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header&Footer/Header/Header";
import Notification from "../Home/Notification/Nontification";
import Footer from "../Header&Footer/Footer/Footer";
import Righter from "../Header&Footer/Righter/Righter";
import { FaRegClock, FaRegCalendarAlt } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FacebookProvider, Comments } from "react-facebook";
import Rating from "./Rating/Rating";
import Loading1 from "../Loading/Loading1";

const VideoDetail = () => {
  const { movieurl, videourl } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [listvideoData, setListVideoData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const navigate = useNavigate();
  const movieid = movieurl.split("-a").pop();
  const videoid = videourl.split("-").pop();
  const scrollRef = useRef();

  const incrementViews = async () => {
    try {
      const data = { movieId: movieid };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/views`,
        data
      );
      if (response.data.success) {
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượt xem từ API: ", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/phim/${movieid}/${videoid}`)
      .then(function (response) {
        console.log(response.data);
        setMovieData(response.data.movies);
        setListVideoData(response.data.listvideos);
        setVideoData(response.data.videos);
        const videoUrl = response.data.videos[0].videoname;
        const movieUrl = response.data.movies[0].movieurl;
        navigate(`/phim/${movieUrl}-a${movieid}/tap-${videoUrl}-${videoid}`);
      })
      .catch(function (error) {
        console.log(error);
        navigate("/not-found");
      });
  }, [movieid, videoid, navigate]);

  useEffect(() => {
    const smoothScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const targetScrollPosition = scrollRef.current.offsetTop - 80;
      const distance = targetScrollPosition - currentScrollPosition;
      const duration = 2500;
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
    smoothScroll();
  }, []);

  const handlePlayVideo = () => {
    incrementViews();
  };

  return (
    <div className="bg-[#263238]">
      <Header />
      <div className="bg-[#253238] flex justify-center w-full ">
        <div className="w-full md:max-w-[1280px] justify-center flex-col bg-[#141414] p-[20px] mt-[100px] xl:mt-[120px] xl:rounded">
          <Notification />
          <div ref={scrollRef} className="table table-fixed w-full">
            <main className="pt-[20px] lg:table-cell lg:pr-[20px] flex-row">
              {videoData.length > 0 ? (
                videoData.map((video) => (
                  <div className="mb-[20px] pt-[55%] w-full relative">
                    <div className="block">
                      <iframe
                        onLoad={handlePlayVideo}
                        title="Video Player"
                        width="560"
                        height="315"
                        className="absolute w-full h-full top-0 left-0 rounded"
                        src={`${video.urlserver}`}
                        frameborder="0"
                        allowfullscreen=""
                      ></iframe>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mb-[20px] pt-[55%] w-full relative">
                  <div className="absolute w-full h-full top-[40%] left-0 rounded">
                    <Loading1 />
                  </div>
                </div>
              )}
              <div className="mb-[20px] w-full relative p-2 bg-[#181D1F] rounded">
                <div className="text-[#78909C] flex items-center font-semibold pb-1 text-[15px]">
                  <MdOutlineSlowMotionVideo className="text-[20px]" />
                  Tập phim khác
                </div>
                <div className="relative flex-wrap flex w-full">
                  {listvideoData.length > 0 ? (
                    listvideoData.map((listvideo) => (
                      <div className=" text-white bg-transparent mr-[5px]">
                        <a
                          href={`/phim/${movieurl}/tap-${listvideo.videoname}-${listvideo.videoid}`}
                        >
                          <div
                            key={listvideo.videoid}
                            className={`font-semibold m-[1px] px-3 py-1 text-[18px] text-white rounded ${
                              listvideo.videoid == videoid
                                ? "bg-[#E62117]"
                                : "bg-[#252525] hover:bg-[#E87D7F] hover:text-[#702526]"
                            }`}
                          >
                            {listvideo.videoname}
                          </div>
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="w-[30px]">
                      <Loading1 />
                    </div>
                  )}
                </div>
              </div>

              {movieData.length > 0 ? (
                movieData.map((movie) => (
                  <>
                    <article
                      key={movie.id}
                      className="bg-cover min-h-[300px] bg-center bg-no-repeat rounded p-5 relative z-1 w-auto"
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_API_URL}/upload/background/${movie.background})`,
                      }}
                    >
                      <header className="relative z-10 md:pl-[200px] min-h-[200px] md:flex-raw text-center md:text-justify">
                        <h1 className="text-[#B5E745] text-[35px] font-semibold md:truncate">
                          {movie.moviename}
                        </h1>
                        <h2 className="text-white text-[20px] font-semibold md:truncate pb-2">
                          {movie.moviesubname}
                        </h2>
                        <div className="md:absolute md:top-0 md:left-0 flex justify-center ">
                          <img
                            className="w-[180px] h-[260px] object-cover rounded"
                            src={`${process.env.REACT_APP_API_URL}/upload/poster/${movie.poster}`}
                            alt="Movie Avatar"
                          />
                        </div>
                        <div className="thanhbar2 w-full">
                          <div className="text-[#C0BBBD] font-semibold h-[100px] thanhbar2 overflow-y-auto mb-[10px] pr-2">
                            {movie.moviedescribe}
                          </div>
                        </div>
                      </header>
                      <footer className="relative flex items-center z-10 xl:ml-[200px] xl:mt-0 mt-[100px] pt-5 border-gray-400 bg-transparent border-t-[1px] ">
                        <div className=" border-gray-400 border-r-[1px] pr-[50px] w-auto">
                          <Rating movieId={movie.movieid} />
                        </div>
                        <div className="flex justify-center w-full">
                          <p className="flex items-center text-white font-semibold text-[14px] ml-[17px]">
                            <FaRegClock className="text-[#999C9A] mr-1" />
                            <span className="mr-4">{movie.time}</span>
                            <FaRegCalendarAlt className="text-[#999C9A] mr-1" />
                            <span className="mr-4">{movie.release_year}</span>
                            <BsFillEyeFill className="text-[#999C9A] mr-1" />
                            <span className="mr-4">{movie.views} Lượt Xem</span>
                          </p>
                        </div>
                      </footer>
                      <div className="absolute inset-0 bg-black opacity-65 rounded"></div>
                    </article>
                    <div className="bg-white mt-[20px] rounded">
                      <FacebookProvider appId="265046719974622">
                        <Comments
                          href={`http://26.227.56.79:3000/phim/commentfacebook/${movie.movieid}`}
                          width="100%"
                          numPosts={5}
                          locale="vi_VN"
                        />
                      </FacebookProvider>
                    </div>
                  </>
                ))
              ) : (
                <div className="p-10">
                  <Loading1 />
                </div>
              )}
            </main>

            <aside className=" lg:table-cell align-top lg:w-[300px] w-full">
              <Righter />
            </aside>
          </div>
        </div>
      </div>
      <div className="w-full xl:mt-[20px] flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default VideoDetail;
