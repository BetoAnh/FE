import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./App.css";
import Error404 from "./Component/Error404/Error404";
import Home from "./Component/Home/Home";
import ExPage from "./Component/ExamplePage/ExPage";
import Hacking from "./Component/Hacking/Hacking";
import ListMovieCategory from "./Component/ListMovie/ListMovieCategory";
import Donate from "./Component/Donate/Donate";
import UserAD from "./Component/Admin/UserAD/UserAD";
import ListMovieType from "./Component/ListMovie/ListMovieType";
import NewMovie from "./Component/ListMovie/NewMovie";
import MovieBox from "./Component/Detail/MovieBox";
import MovieDetail from "./Component/Detail/MovieDetail";
import Login from "./Component/User/Login/Login";
import VideoDetail from "./Component/Detail/VideoDetail";
import Page2 from "./Component/User/ProfileCHA/Page2/Page2";
import ProfileCHA from "./Component/User/ProfileCHA/ProfileCHA";
import NewList from "./Component/Home/List1/NewList";
import SiderBar from "./Component/Admin/SiderBar/SiderBar";
import MovieAD from "./Component/Admin/MovieAD/MovieAD";
import EX from "./Component/ExamplePage/EX";
import Follow from "./Component/User/Follow/Follow";
import HotMovie from "./Component/ListMovie/HotMovie";
import ComingSoon from "./Component/ListMovie/ComingSoon";
import Loading from "./Component/Loading/Loading";

function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/status`
        );
        if (response.status === 200) {
          setIsBackendReady(true);
        }
      } catch (error) {
        console.error("Error checking backend status:", error.message);
        setIsBackendReady(false);
      }
    };

    checkBackendStatus();
  }, []);

  if (!isBackendReady) {
    return <><Loading/></>;
  }

  return (
    <div className="App h-screen bg-[#253238]">
      <Router>
        <PayPalScriptProvider
          options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID }}
        >
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="*" element={<Error404 />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/not-found" element={<Error404 />} />
            <Route path="/Profile" element={<ProfileCHA />} />
            <Route path="/ExPage" element={<ExPage />} />
            <Route path="/EX" element={<EX />} />
            <Route path="/Hacking" element={<Hacking />} />
            <Route path="/Donate" element={<Donate />} />
            <Route path="/Follow" element={<Follow />} />
            <Route path="/Page2" element={<Page2 />} />
            <Route path="/AdminPage" element={<SiderBar />} />
            <Route path="/UserAD" element={<UserAD />} />
            <Route path="/phim-moi" element={<NewMovie />} />
            <Route path="/phim-moi/:page" element={<NewMovie />} />
            <Route path="/danh-muc/:category" element={<ListMovieCategory />} />
            <Route
              path="/danh-muc/:category/:page"
              element={<ListMovieCategory />}
            />
            <Route path="/the-loai/:type" element={<ListMovieType />} />
            <Route path="/the-loai/:type/:page" element={<ListMovieType />} />
            <Route path="/MovieBox/:movieid" element={<MovieBox />} />
            <Route path="/phim/:url" element={<MovieDetail />} />
            <Route path="/phim/:movieurl/:videourl" element={<VideoDetail />} />
            <Route path="/Admin/Movie" element={<MovieAD />} />
            <Route path="/NewList" element={<NewList />} />
            <Route path="/phim-noi-bat" element={<HotMovie />} />
            <Route path="/sap-chieu/:page" element={<ComingSoon />} />
            <Route path="/sap-chieu" element={<ComingSoon />} />
          </Routes>
        </PayPalScriptProvider>
      </Router>
    </div>
  );
}

export default App;
