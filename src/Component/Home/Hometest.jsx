import React,{useEffect} from "react";
import './App.css';
import { NavLink } from "react-router-dom";

const Hometest = () => {
    useEffect (() => {
        document.title = "Donate";
      },[]);

    const handleVideoClick = (event) => {
        event.preventDefault(); 
        const videoUrl = event.currentTarget.getAttribute('href');
        window.location.href = videoUrl; 
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={process.env.PUBLIC_URL + '/img/donatepls.jpg'} className="App-logo" alt="" />
                <p>
                    Đô nết để ủng hộ nhóm nhé ❤️
                </p>
                <div className="App-link">
                    <a className="App-link1"
                        href={process.env.PUBLIC_URL + '/img/tusenavoicenhat.mp4'}
                        onClick={handleVideoClick}>
                        寄付する
                    </a>
                    <a className="App-link2"
                        href={process.env.PUBLIC_URL + '/img/tusenacute.mp4'}
                        onClick={handleVideoClick}>
                        Donate
                    </a>
                </div>
                <NavLink
          to="/Home"
          className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded hover:bg-gradient-to-r hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-colors duration-300"
        >
          Go back to homepage
        </NavLink>
            </header>
        </div>
    );
};

export default Hometest;