import React from "react";
import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
const Footer = () => {
  // const handleScrollToTop = (event) => {
  //   event.preventDefault();
  //   const scrollToTop = () => {
  //     if (window.scrollY !== 0) {
  //       window.scrollTo({
  //         top: window.scrollY - 85,
  //         behavior: "smooth",
  //       });
  //       requestAnimationFrame(scrollToTop);
  //     }
  //   };
  //   scrollToTop();
  // };
  const handleScrollToTop = (event) => {
    event.preventDefault();

    const scrollToTop = () => {
      const scrollStep = window.pageYOffset / 12;
      if (window.pageYOffset > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, window.pageYOffset - scrollStep);
      }
    };

    scrollToTop();
  };
  return (
    <div className=" bottom-0 left-0 w-full h-[550px] bg-black pt-[30px] md:max-w-[1280px] xl:rounded">
      <div className="flex h-[400px] ml-[50px] mr-[50px] border-gray-600 border-b-2">
        <div className="md:w-[40%] flex flex-col overflow-hidden w-full">
          <div className="w-[15%] h-auto ">
            <NavLink to="/Home" onClick={handleScrollToTop}>
              <img
                src="../../img/logo.png"
                alt="logo"
                className=" w-full h-auto "
              />
            </NavLink>
          </div>
          <div className=" w-auto h-auto mt-[25px]">
            <div className="flex flex-col text-left gap-[15px]">
              <span className="text-white text-[20px] ">
                Địa chỉ: 384/17 Huỳnh Văn Bánh, Phường 14, Quận Phú Nhuận, Thành
                phố Hồ Chí Minh, Việt Nam
              </span>
              <span className="text-white text-[20px] ">
                Số điện thoại: 678-136-7092
              </span>
              <div className="w-auto h-auto ">
                <span className="text-white text-[20px] ">Email: </span>
                <NavLink
                  to="/Hacking"
                  className="text-orange-600 text-[20px] mt-[30px]"
                >
                  <span>TrumBomHangVN@gmail.com</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-1 ml-[30px] justify-between overflow-hidden hidden md:flex">
          {/*NỘI DUNG*/}
          <div className=" h-full flex-col items-center text-left ">
            <div className="w-auto flex flex-col">
              <span className="text-white text-[30px] mb-[20px] truncate">
                Thông tin
              </span>
              <div className=" my-[15px]">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Trang chủ</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Phim</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Series</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/*DỊCH VỤ*/}
          <div className=" h-full flex-col items-center text-left hidden md:flex">
            <div className="w-auto flex flex-col">
              <span className="text-white text-left text-[30px] mb-[20px] truncate">
                Dịch vụ
              </span>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Trang chủ</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Blog</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Nội dung</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/*HỖ TRỢ*/}
          <div className="w-1/3 h-full flex-col items-center text-left ml-[30px] hidden md:flex">
            <div className="w-full flex flex-col">
              <span className="text-white text-left text-[30px] mb-[20px] truncate">
                Hỗ trợ
              </span>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white  text-[20px] mt-[30px]">
                  <span>Quyền riêng tư</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Trách nhiệm người dùng</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>FAQs</span>
                </NavLink>
              </div>
              <div className="inline-block my-[15px] text-left">
                <NavLink to="/Home" className="text-white text-[20px] mt-[30px]">
                  <span>Chính sách và quy trình xử lý khiếu nại</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*BOT*/}
      <div className=" h-[70px] mr-[50px] ml-[50px] flex items-center justify-center">
        <div className=" w-1/3 flex">
          <NavLink to="/Home">
            <span className="text-white text-[20px] hidden md:block justify-start ml-[50px]">
              Xem phim
            </span>
          </NavLink>
        </div>
        <div className="social w-2/3 hidden sm:flex items-center justify-end">
          <span className="text-white text-[20px] mr-4 hidden lg:flex">
            Theo dõi mạng xã hội:
          </span>
          <div className="mr-4">
            <ul>
              <li class="item">
                <a href="https://www.instagram.com/?hl=vi">
                  <i class="fa-brands fa-instagram icon"></i>
                </a>
              </li>
              <li class="item">
                <a href="https://www.facebook.com/?locale=vi_VN">
                  <i class="fa-brands fa-facebook icon"></i>
                </a>
              </li>
              <li class="item">
                <a href="https://www.youtube.com/">
                  <i class="fa-brands fa-youtube icon"></i>
                </a>
              </li>
              <li class="item">
                <a href="https://twitter.com/?lang=vi">
                  <i class="fa-brands fa-x-twitter icon"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <button onClick={handleScrollToTop}>
          <div className="w-[40px] h-[40px] bg-lime-500 hover:bg-lime-600 ml-2 rounded flex items-center justify-center">
            <img
              src="../../img/SocialNetworkLogos/arrow-up-solid.svg"
              alt="back-up"
              className="w-2/3 h-2/3 text-cyan-400"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
export default Footer;
