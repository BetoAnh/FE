import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header&Footer/Header/Header";
import Footer from "../Header&Footer/Footer/Footer";
import Paypal from "./Paypal";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loading1 from "../Loading/Loading1";

const Donate = () => {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showPaypal, setShowPaypal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [donateData, setDonateData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/donate`)
      .then(function (response) {
        console.log(response.data);
        setDonateData(response.data.donates);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handlePriceChange = (price) => {
    const chosenProduct = donateData.find((product) => product.price === price);
    setSelectedPrice(price);
    setDescription(chosenProduct.description);
    setShowModal(true);
    setShowPaypal(false);
  };

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value);
  // };

  const handleRefuse = () => {
    setShowModal(false);
    setShowPaypal(false);
  };
  const handleDescriptionSubmit = () => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setShowModal(false);
      setShowPaypal(true);
    } else {
      setShowModal(false);
      Swal.fire({
        title: "Bạn phải đăng nhập trước khi theo dõi phim!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.scrollTo(0, 0);
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      <div className="bg-[#263238]">
        <Header />
        <div className="bg-[#253238] flex justify-center">
          <div className="w-[1280px] justify-center flex-col bg-[#141414] p-[20px] xl:mt-[120px] mt-[100px] xl:rounded">
            <div className="flex justify-center">
              <p className="text-4xl text-white">Chọn gói bạn muốn Donate</p>
            </div>
            <div className="flex flex-col items-center ">
              <div className="flex flex-wrap mt-[10px] justify-center">
                {donateData.length > 0 ? (
                  donateData.map((product) => (
                    <div className="px-[20px] my-2">
                      <div
                        className={`text-white cursor-pointer ${
                          selectedPrice === product.price
                            ? "border-red-500"
                            : ""
                        }`}
                        key={product.price}
                        onClick={() => handlePriceChange(product.price)}
                      >
                        <img
                          src={`../../img/${product.img}`}
                          alt={`$${product.price}`}
                          className="w-[200px] h-[300px] rounded"
                        />
                        <span className="text-white flex justify-center mt-[10px]">
                          ${product.price}
                        </span>
                        {selectedPrice === product.price && showPaypal && (
                          <div className="mt-[10px]">
                            <Paypal product={product} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10">
                  <Loading1 />
                  </div>
                )}
              </div>
            </div>
            {showModal && (
              <div className="fixed z-40 inset-0 overflow-y-auto ">
                <div className="flex justify-center items-center h-full p-4 bg-gray-500 bg-opacity-75">
                  <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
                    <h2 className="text-xl font-medium mb-[20px] text-center w-full">
                      Bạn muốn donate gói "{description}" này cho admin chứ?
                    </h2>

                    <div className="flex mt-4 justify-between items-center">
                      <button
                        className="bg-gray-300 w-[150px] text-black p-2 rounded-md"
                        onClick={handleRefuse}
                      >
                        Chọn gói khác
                      </button>
                      <button
                        className="bg-red-500 w-[150px] text-white p-2 rounded-md ml-2"
                        onClick={() => {
                          handleDescriptionSubmit();
                        }}
                      >
                        Đúng vệy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full xl:mt-[20px] flex justify-center">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Donate;
