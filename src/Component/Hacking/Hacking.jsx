import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Hacking = () => {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="flex flex-row items-center  mb-[50px]">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-[60px] text-red-700 mr-[20px]" />
                <span className="text-black text-[50px]">Máy tính của bạn đang bị truy cập trái phép!!</span>
            </div>
            <div className="flex justify-center items-center">
                <img src="./img/hacking.png" alt="hách cơ lỏ" />
            </div>
        </div>
    );
};

export default Hacking;