import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewList from "./NewList";
import { FaChevronRight } from "react-icons/fa";

const TableList = () => {
  const [selectedId, setSelectedId] = useState("phim-moi");

  const handleLinkClick = (value) => {
    setSelectedId(value);
  };

  return (
    <div className="pt-[10px] w-full">
      <div className="w-full flex text-[19px] pb-[10px] items-center">
        <div className="bg-[#A3182A] text-white flex items-center h-[40px] px-[10px] rounded">MỚI CẬP NHẬT<FaChevronRight className="text-[15px] ml-[10px]"/></div>
        <button
          className={`p-5 ${
            selectedId === "phim-moi" ? "text-[#F43822]" : "text-white "
          }`}
          value="phim-moi"
          onClick={() => handleLinkClick("phim-moi")}
        >
          Tất Cả
        </button>
        <button
          className={`p-5 ${
            selectedId === "danh-muc/phim-le" ? "text-[#F43822]" : "text-white "
          }`}
          value="phim-le"
          onClick={() => handleLinkClick("danh-muc/phim-le")}
        >
          Phim Lẻ
        </button>
        <button
          className={`p-5 ${
            selectedId === "danh-muc/phim-bo" ? "text-[#F43822]" : "text-white "
          }`}
          value="phim-bo"
          onClick={() => handleLinkClick("danh-muc/phim-bo")}
        >
          Phim Bộ
        </button>
      </div>
      <div>
        <NewList id={selectedId} />
      </div>
      <div className="text-white w-full text-[25px] flex justify-center pr-[20px]">
        <Link to={`/${selectedId}`} className="bg-[#161E21] w-full py-1 ">
          <button className="bg-[#161E21] w-full font-sans hover:opacity-50">
            Xem Thêm..
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TableList;
