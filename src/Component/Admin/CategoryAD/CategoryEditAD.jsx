import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryEditAD = ({ handleCloseSelected, category }) => {
  const [categoryname, setcategoryname] = useState(
    category.categoryname || null
  );
  const [categoryurl, setcategoryurl] = useState(category.categoryurl || null);

  const handleSubmit = async () => {
    try {
      const requestData = {
        categoryname: categoryname,
        categoryurl: categoryurl,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/category/edit/${category.categoryid}`,
        requestData
      );

      if (response.data.message) {
        // Nếu có, hiển thị thông báo thành công
        alert(response.data.message);
        handleCloseSelected();
      } else {
        // Nếu không, hiển thị thông báo thất bại
        alert("Sửa dữ liệu vào SQL thất bại.");
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi sửa dữ liệu vào SQL: ", error);
      alert("Đã xảy ra lỗi khi sửa dữ liệu vào SQL.");
    }
  };

  return (
    <div className="relative font-semibold capitalize bg-white p-4 z-20 rounded text-black overflow-y-auto">
      <div className="">
        <div className="border-b-2 mb-2">
          <p className="font-bold">Tên danh mục</p>
          <input
            className="w-full text-gray-600 mb-2"
            placeholder="Tên danh mục..."
            value={categoryname}
            onChange={(e) => setcategoryname(e.target.value)}
          />
        </div>
        <div className="border-b-2 mb-2">
          <p className="font-bold">Url danh mục</p>
          <input
            className="w-full text-gray-600 mb-2"
            placeholder="Url danh mục..."
            value={categoryurl}
            onChange={(e) => setcategoryurl(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Sửa danh mục
        </button>
      </div>
    </div>
  );
};

export default CategoryEditAD;
