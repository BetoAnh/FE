import React, { useState } from "react";
import axios from "axios";

const DonateAddAD = ({ handleCloseSelected }) => {
  const [imgPreview, setImgPreview] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [donatename, setdonatename] = useState(null);
  const [description, setdescription] = useState(null);
  const [price, setprice] = useState(null);

  // Hàm xử lý khi người dùng chọn file ảnh poster
  const handleImgChange = (file) => {
    if (file) {
      setImgFile(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        img: imgFile,
        donatename: donatename,
        description: description,
        price: price,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/donate/add`,
        requestData
      );

      if (response.data.message) {
        alert(response.data.message);
        handleCloseSelected();
      } else {
        alert("Thêm dữ liệu vào SQL thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm dữ liệu vào SQL: ", error);
      alert("Đã xảy ra lỗi khi thêm dữ liệu vào SQL.");
    }
  };

  return (
    <div className="relative font-semibold capitalize bg-white p-4 z-20 w-[600px] rounded text-black overflow-y-auto">
      <div className="tabel table-fixed">
        <div className="table-cell pr-[20px]">
          <p className="font-bold">Ảnh</p>
          <label htmlFor="imgInput" className="block mt-1 cursor-pointer">
            <input
              id="imgInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImgChange(e.target.files[0])}
            />
            <img
              src={imgPreview || "../../img/default2.jpg"}
              alt="Poster Preview"
              className="min-w-[150px] max-w-[150px] rounded border border-gray-300"
            />
            <span className="text-gray-600">Chọn ảnh</span>
          </label>
        </div>
        <div className="table-cell w-full">
          <div className="border-b-2 mb-2">
            <p className="font-bold">Tên donate</p>
            <input
              className="w-full text-gray-600 mb-1"
              placeholder="Tên donate..."
              value={donatename}
              onChange={(e) => setdonatename(e.target.value)}
            />
          </div>
          <div className="border-b-2 mb-2">
            <p className="font-bold">Mô tả</p>
            <textarea
              className="w-full h-24 resize-none text-gray-600"
              placeholder="Mô tả..."
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className="border-b-2 mb-2">
            <p className="font-bold">Giá</p>
            <input
              className="w-full text-gray-600 mb-1"
              placeholder="Giá...(vd: 1.99)"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Thêm Donate
        </button>
      </div>
    </div>
  );
};

export default DonateAddAD;
