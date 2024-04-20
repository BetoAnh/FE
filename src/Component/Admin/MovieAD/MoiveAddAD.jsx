import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieAddAD = ({ handleCloseSelected }) => {
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posterPreview, setPosterPreview] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState("");

  const [posterFile, setPosterFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [moviename, setmoviename] = useState(null);
  const [author, setauthor] = useState(null);
  const [release_year, setrelease_year] = useState(null);
  const [time, settime] = useState(null);
  const [episodes, setepisodes] = useState(null);
  const [movieurl, setmovieurl] = useState(null);
  const [moviedescribe, setmoviedescribe] = useState(null);
  const [moviesubname, setmoviesubname] = useState(null);
  const [trailerurl, settrailerurl] = useState(null);

  // Hàm xử lý khi người dùng chọn file ảnh poster
  const handlePosterChange = (file) => {
    if (file) {
      setPosterFile(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBackgroundChange = (file) => {
    if (file) {
      setBackgroundFile(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/type`
        );
        const categoriesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/category`
        );

        setTypes(typesResponse.data.types);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const handleCheckboxChange = (typeId) => {
    const isSelected = selectedTypes.includes(typeId);
    if (isSelected) {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleRadioChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        poster: posterFile,
        background: backgroundFile,
        moviename: moviename,
        moviesubname: moviesubname,
        moviedescribe: moviedescribe,
        author: author,
        release_year: release_year,
        time: time,
        episodes: episodes,
        movieurl: movieurl,
        trailerurl: trailerurl,
        types: selectedTypes,
        category: selectedCategory,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/movie/add`,
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
    <div className="relative h-[650px] font-semibold capitalize bg-white p-4 z-20 w-[850px] rounded text-black overflow-y-auto">
      <div className="border-b-2 mb-2">
        <p className="font-bold">Tên phim</p>
        <input
          className="w-full text-gray-600"
          placeholder="Tên phim..."
          value={moviename}
          onChange={(e) => setmoviename(e.target.value)}
        />
      </div>
      <div className="border-b-2 mb-2">
        <p className="font-bold">Tên khác</p>
        <input
          className="w-full text-gray-600"
          placeholder="Tên khác..."
          value={moviesubname}
          onChange={(e) => setmoviesubname(e.target.value)}
        />
      </div>
      <div className="border-b-2 mb-2">
        <p className="font-bold">Mô tả</p>
        <input
          className="w-full text-gray-600"
          placeholder="Mô tả phim..."
          value={moviedescribe}
          onChange={(e) => setmoviedescribe(e.target.value)}
        />
      </div>
      <div className="flex flex-row justify-between border-b-2 mb-2">
        <div className="">
          <p className="font-bold">Studio</p>
          <input
            className=" text-gray-600"
            placeholder="Tên studio..."
            value={author}
            onChange={(e) => setauthor(e.target.value)}
          />
        </div>
        <div className="">
          <p className="font-bold">Thời lượng</p>
          <input
            className=" text-gray-600"
            placeholder="Thời lương(h/p)..."
            value={time}
            onChange={(e) => settime(e.target.value)}
          />
        </div>
        <div className="">
          <p className="font-bold">Số tập</p>
          <input
            type="number"
            className=" text-gray-600 w-[100px]"
            placeholder="Số tập..."
            min="0"
            max="9999"
            value={episodes}
            onChange={(e) => setepisodes(e.target.value)}
          />
        </div>
        <div className="">
          <p className="font-bold">Năm phát hành</p>
          <input
            type="number"
            className=" text-gray-600 w-[100px]"
            placeholder="Năm..."
            min="1000"
            max="9999"
            value={release_year}
            onChange={(e) => setrelease_year(e.target.value)}
          />
        </div>
      </div>
      <div className="border-b-2 mb-2">
        <p className="font-bold">Thể loại</p>
        <div className="flex flex-wrap mt-1">
          {types.map((type) => (
            <label
              key={type.typeid}
              className="inline-flex items-center mr-4 mb-2"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                value={type.typeid}
                checked={selectedTypes.includes(type.typeid)}
                onChange={() => handleCheckboxChange(type.typeid)}
              />
              <span className="ml-2 text-gray-700">{type.typename}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 mb-2">
        <p className="font-bold">Danh mục</p>
        <div className="flex flex-wrap mt-1">
          {categories.map((category) => (
            <label
              key={category.categoryid}
              className="inline-flex items-center mr-4 mb-2"
            >
              <input
                type="radio"
                className="form-radio h-5 w-5 text-gray-600"
                name="category"
                value={category.categoryid}
                checked={selectedCategory === category.categoryid}
                onChange={() => handleRadioChange(category.categoryid)}
              />
              <span className="ml-2 text-gray-700">
                {category.categoryname}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="border-b-2 mb-2">
        <p className="font-bold">Đường dẫn</p>
        <input
          className="w-full text-gray-600"
          placeholder="Đường dẫn...(không dấu và cách nhau bởi dấu '-')"
          value={movieurl}
          onChange={(e) => setmovieurl(e.target.value)}
        />
      </div>
      <div className="border-b-2 mb-2">
        <p className="font-bold">Trailer</p>
        <input
          className="w-full text-gray-600"
          placeholder="Link trailer..."
          value={trailerurl}
          onChange={(e) => settrailerurl(e.target.value)}
        />
      </div>
      <div className="tabel table-fixed">
        <div className="table-cell pr-[20px]">
          <p className="font-bold">Poster</p>
          <label htmlFor="posterInput" className="block mt-2 cursor-pointer">
            <input
              id="posterInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handlePosterChange(e.target.files[0])}
            />
            <img
              src={posterPreview || "../../img/default.jpg"}
              alt="Poster Preview"
              className="min-w-[150px] max-w-[150px] rounded border border-gray-300"
            />
            <span className="text-gray-600">Chọn ảnh poster</span>
          </label>
        </div>
        <div className="table-cell">
          <p className="font-bold">Background</p>
          <label
            htmlFor="backgroundInput"
            className="block mt-2 cursor-pointer"
          >
            <input
              id="backgroundInput"
              type="file"
              className="hidden"
              onChange={(e) => handleBackgroundChange(e.target.files[0])}
            />
            <img
              src={backgroundPreview || "../../img/default.jpg"}
              alt="Background Preview"
              className="rounded border border-gray-300"
            />
            <span className="text-gray-600">Chọn ảnh nền</span>
          </label>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Thêm phim
        </button>
      </div>
    </div>
  );
};

export default MovieAddAD;
