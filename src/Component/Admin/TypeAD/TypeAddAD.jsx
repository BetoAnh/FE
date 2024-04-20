import React, { useState, useEffect } from "react";
import axios from "axios";

const TypeAddAD = ({ handleCloseSelected }) => {
  const [typename, settypename] = useState(null);
  const [typeurl, settypeurl] = useState(null);

  const handleSubmit = async () => {
    try {
      const requestData = {
        typename: typename,
        typeurl: typeurl,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/type/add`,
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
    <div className="relative font-semibold capitalize bg-white p-4 z-20 rounded text-black overflow-y-auto">
      <div className="">
        <div className="border-b-2 mb-2">
          <p className="font-bold">Tên thể loại</p>
          <input
            className="w-full text-gray-600 mb-2"
            placeholder="Tên thể loại..."
            value={typename}
            onChange={(e) => settypename(e.target.value)}
          />
        </div>
        <div className="border-b-2 mb-2">
          <p className="font-bold">Url thể loại</p>
          <input
            className="w-full text-gray-600 mb-2"
            placeholder="Url thể loại..."
            value={typeurl}
            onChange={(e) => settypeurl(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Thêm thể loại
        </button>
      </div>
    </div>
  );
};

export default TypeAddAD;
