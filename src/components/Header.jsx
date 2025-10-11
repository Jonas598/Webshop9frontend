import React from "react";
import ProfileDropDown from "./ui/ProfileDropDown.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className=" px-7 sm:px-22 h-[10vh] w-full flex items-center justify-between">
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="h-[60px] w-[60px]" src="/src/assets/logo.png" alt="" />
        <h1 className="text-2xl font-bold ">Seedo</h1>
      </div>
      {localStorage.getItem("webshopAuthtoken") ? (
        <div>
          <ProfileDropDown />
        </div>
      ) : (
        <div className="border border-black py-1 px-2 rounded-lg">
          <a href="/signup"> Login / Signup</a>
        </div>
      )}
    </div>
  );
};

export default Header;
