import React from "react";
import Header from "../Header&Footer/Header/Header";
// import Catalog from "../Catalog/Catalog(Home)";
import Footer from "../Header&Footer/Footer/Footer";
import Notification from "./Notification/Nontification";
import Slider10 from "./Slider10/Slider10";
import Righter from "../Header&Footer/Righter/Righter";
import Slider1 from "./Slider1/Slider1";
import TableList from "./List1/TableList";
import ComingSoonList from "./List1/ComingSoonList";
const Home = () => {
  return (
    <div className="bg-[#263238]">
      <Header />
      <div className="bg-[#253238] flex justify-center ">
        <div className="md:max-w-[1280px] w-full justify-center flex-col bg-[#141414] p-[20px] mt-[100px] xl:mt-[120px] xl:rounded">
          <Notification />
          <div className="w-full">
            <Slider10 />
          </div>
          <div className="table table-fixed w-full">
            <div className="flex-row lg:table-cell pt-[20px] align-top">
              <div className="lg:mr-[20px] rounded">
                <Slider1 />
              </div>
              <div>
                <TableList />
              </div>
              <div className="mt-5 mb-1">
                <ComingSoonList />
              </div>
            </div>
            <div className="lg:table-cell lg:w-[300px] w-full">
              <Righter />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:mt-[20px] flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
