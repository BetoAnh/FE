import React, { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const Test1 = () => {
  const [active, setActive] = useState("");
  const click = () => {
    setActive(!active);
    console.log(!active);
  };
  return (
    <div className="flex justify-center items-center text-black h-screen gap-[30px]">

<div id="nav-bar">
  <input id="nav-toggle" type="checkbox"/>
  <div id="nav-header"><a id="nav-title" href="https://codepen.io" target="_blank">C<i class="fab fa-codepen"></i>DEPEN</a>
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr/>
  </div>
  <div id="nav-content">
    <div class="nav-button"><i class="fas fa-palette"></i><span>Your Work</span></div>
    <div class="nav-button"><i class="fas fa-images"></i><span>Assets</span></div>
    <div class="nav-button"><i class="fas fa-thumbtack"></i><span>Pinned Items</span></div>
    <hr/>
    <div class="nav-button"><i class="fas fa-heart"></i><span>Following</span></div>
    <div class="nav-button"><i class="fas fa-chart-line"></i><span>Trending</span></div>
    <div class="nav-button"><i class="fas fa-fire"></i><span>Challenges</span></div>
    <div class="nav-button"><i class="fas fa-magic"></i><span>Spark</span></div>
    <hr/>
    <div class="nav-button"><i class="fas fa-gem"></i><span>Codepen Pro</span></div>
    <div id="nav-content-highlight"></div>
  </div>
  <input id="nav-footer-toggle" type="checkbox"/>
  <div id="nav-footer">
    <div id="nav-footer-heading">
      <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547"/></div>
      <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">uahnbu</a><span id="nav-footer-subtitle">Admin</span></div>
      <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
    </div>
    <div id="nav-footer-content">
    </div>
  </div>
</div>
    </div>
  
 
    
  );
};
export default Test1;