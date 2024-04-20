import React, { useState } from "react";
import "./testt.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

const Test = () => {
  const [open, setOpen] = useState(false);
  const handleClick1 = () => {
    alert("Click1 cc");
  };
  const handleHover = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };
  const handleClick2 = () => {
    alert("Click2 cc");
  };

  return (
    <div className=" flex flex-1 flex-col justify-center items-center text-black  bg-gray-500">
      <div
        className="bg-red-500 cursor-pointer"
        onClick={() => {
          setOpen(!open);
          
        }}
        onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      >
        <span>TestPage</span>
      </div>

        <div className={`dropdown bg-white ${open? 'active':'inactive'}`}
         onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      >
          <ul className="">
            <DropdownItem
              icon={<FaRegUserCircle />}
              name="Profile"
              onClick={handleClick1}
            />
            <DropdownItem
              icon={<FaRegUserCircle />}
              name="Profile"
              onClick={handleClick2}
            />
            <DropdownItem icon={<FaRegUserCircle />} name="Profile" />
            <DropdownItem icon={<RiLogoutBoxLine />} name="Logout" />
          </ul>
        </div>
    </div>
  );
};

function DropdownItem({ icon, name, onClick }) {
  return (
    <li
      className="flex flex-row items-center gap-[10px] cursor-pointer"
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {name && <span>{name}</span>}
    </li>
  );
}

export default Test;
