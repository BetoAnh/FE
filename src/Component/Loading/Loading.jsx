import React, { useState, useEffect } from "react";

const Loading = () => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsError(true); // Kích hoạt hiển thị thông báo lỗi sau một khoảng thời gian
    }, 1500); // Thời gian đợi trước khi hiển thị thông báo lỗi, đơn vị: mili giây

    return () => clearTimeout(timer); // Xóa bộ đếm khi component unmount
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isError ? ( // Hiển thị thông báo lỗi nếu isError là true
        <div className="w-screen h-screen flex">
        <div className="flex-1 flex justify-center items-center">
          <h1 className="font-extrabold text-lg md:text-xl lg:text-2xl xl:text-3xl">Lỗi kết nối đến máy chủ</h1>
        </div>
        <div className="">
          <img src="../../img/anhdep.jpg" className="h-screen"/>
        </div>
      </div>
      ) : ( // Hiển thị màn hình đen với vòng quay loading
      <div className="w-screen h-screen flex">
        <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Loading;