import React from "react";
import logo from "/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("webshopAuthtoken")) {
    navigate("/home");
  }
  return (
   
    <div className="h-[80vh] w-full flex flex-col sm:flex-rows items-center justify-center">
      <div className="flex">
        <img src={logo} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="text-6xl font-bold text-center">Web Shop to Buy Seeds</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
