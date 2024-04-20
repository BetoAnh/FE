import React, { useEffect, useState } from "react";
import Nav from "../../Nav/Nav";

const Header = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const threshold = 100; 
      setHeaderVisible(scrollTop < threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-16 z-30 transition-all duration-1000 ${
        isHeaderVisible ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <Nav/>
    </div>
  );
};

export default Header;