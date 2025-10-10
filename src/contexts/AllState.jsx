import React, { useEffect, useState } from "react";
import AllContext from "./allContext.jsx";

export default function AllState(props) {
  

  const baseUrl = "https://webshop9backend.onrender.com";

  const [fetchedAllProducts, setFetchedAllProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  //Fetch all works
  const fetchAllProducts = async () => {
    const apires = await fetch(`${baseUrl}/v1/api/product/fetchAllProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      setFetchedAllProducts(jsonres.products);
    } else {
      alert(jsonres.error);
    }
  };

  //user signup
  const userSignUp = async (userInfo) => {
    const apires = await fetch(`${baseUrl}/v1/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        address: userInfo.address,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      localStorage.setItem("webshopAuthtoken", jsonres.authtoken);
    } else {
      alert(jsonres.error);
    }
  };










  //user login
  const userLogin = async (userInfo) => {
    const apires = await fetch(`${baseUrl}/v1/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      localStorage.setItem("webshopAuthtoken", jsonres.authtoken);
    } else {
      alert(jsonres.error);
    }
  };








  return (
    <AllContext.Provider
      value={{ fetchedAllProducts, fetchAllProducts, userSignUp,userLogin }}
    >
      {props.children}
    </AllContext.Provider>
  );
}
