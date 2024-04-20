import React from "react";
import { FaPlay } from "react-icons/fa";
import { FacebookProvider, Comments } from "react-facebook";
const Righter = () => {
  return (
    <div className="bg-[#141414] text-white w-full flex py-[20px] flex-col">
      <div className="bg-[#181D1F] px-[10px] pb-[10px] rounded flex flex-col ">
        <div className="py-[10px] border-b-[3px] border-[#B5E745]">
          <p className="font-bold">Hôm nay xem gì?</p>
        </div>
        <div className="mt-[20px] flex flex-row">
          <p>
            Nếu bạn buồn phiền không biết xem gì hôm nay. Hãy để chúng tôi chọn
            cho bạn
          </p>
        </div>
        <div className="bg-red-500 text-white my-[10px] py-[5px] px-[10px] rounded-[5px] flex">
          <button className="flex flex-1 justify-end items-center">
            <FaPlay className="" />
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="flex-1 flex justify-center"
            >
              Xem Phim Ngẫu nhiên
            </a>
          </button>
        </div>
        <div>
          <img
            src="../../img/gif.gif"
            alt="video"
            className="w-[100%] rounded"
          />
        </div>
        <div className="py-[10px] border-b-[3px] border-[#B5E745] mt-2">
          <p className="font-bold">Hỏi/đáp phim</p>
        </div>
        <div className="bg-white rounded mt-3">
          <FacebookProvider appId="265046719974622">
            <Comments
              href={`http://26.227.56.79:3000/phim/commentfacebook/`}
              width="100%"
              numPosts={5}
              locale="vi_VN"
            />
          </FacebookProvider>
        </div>
      </div>
    </div>
  );
};
export default Righter;
