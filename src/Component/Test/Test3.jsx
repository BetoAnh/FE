import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./test3.css";

const Test3 = () => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(0);
  const [show, setShow] = useState(false);
  const percentRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(update, 30);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (load === 100) {
      setTimeout(() => {
        navigate("/Home");
      }, 2200);
    }
  }, [load, navigate]);

  function update() {
    setLoad((prevLoad) => {
      if (prevLoad === 99) {
        setShow(true);
        setTimeout(() => {
          setLoad(100);
        }, 4000);
        return prevLoad;
      } else {
        const newLoad = prevLoad < 100 ? prevLoad + 1 : prevLoad;
        if (percentRef.current) {
          percentRef.current.innerHTML = newLoad;
        }
        if (circleRef.current) {
          circleRef.current.style.background = `conic-gradient(from 0deg at 50% 50%, #6f7bf7 0%, #9bf8f4 ${newLoad}%, #101012 ${newLoad}%)`;
        }
        return newLoad;
      }
    });
  }

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center gap-4 bg-black">
      <div className="circle" ref={circleRef}>
        <p className="count">
          <span className="percent" ref={percentRef}>
            {load}{" "}
          </span>
          <span className="percent">%</span>
        </p>
      </div>
      {/* {load < 100 ? (
        load === 99 ? (
          show && 
          <div className="absolute flex flex-1 h-screen w-full">
            <img src="/img/loading.webp" alt="loading" className="w-full "/>
            <span className="absolute  top-[50%] left-[50%] text-[20px] text-red-500">Xem sẽ ít thôi lag vcl</span>
          </div>
        ) : (
          <span className="text-30px] text-white">Đang tải giao diện</span>
        )
      ) : (
        <span className="text-30px] text-white">Đang truy cập trang web</span>
      )} */}
      {/* {load <= 99 ? (
        <span className="text-30px text-white">Đang tải giao diện</span>
      ) : load === 100 ? (
        <span className="text-30px text-white">Đang truy cập trang web</span>
      ) : null} */}
    </div>
  );
};

export default Test3;
