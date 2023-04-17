import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
const sidebar = ({ sidebarOpen }) => {
  return (
    <div
      className="border-2 border-white bg-white h-screen w-6/12 block md:hidden absolute top-[64px] right-0 z-[1] position-fixed   transition-all duration-300"
      style={{
        transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
        transition: "all 5000ms",
      }}
    >
      <ul className="flex flex-col items-center py-5 px-3">
        <li className="border-b-[1px] w-full text-start py-3">
          List Your Products
        </li>
        <li className="border-b-[1px] w-full text-start py-3">Help</li>
        <li className="border-b-[1px] w-full text-start py-3">My Account</li>
      </ul>
    </div>
  );
};

export default sidebar;
