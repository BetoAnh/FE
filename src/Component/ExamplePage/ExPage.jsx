import React from "react";
import Header from "../Header&Footer/Header/Header";
import Footer from "../Header&Footer/Footer/Footer";

const ExPage = () => {
    return (
        <div className="bg-[#263238]">
            <Header />
            <div className="bg-[#253238] flex  justify-center">
                <div className="w-[1280px]  justify-center flex-col bg-[#141414] p-[20px] mt-[130px] rounded">


                    {/*Thêm nội dung*/}


                </div>
            </div>
            <div className="w-full mt-[20px] flex justify-center">
                <Footer />
            </div>
        </div>
    );
};

export default ExPage;