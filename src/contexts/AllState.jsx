import React, { useEffect, useState } from "react";
import AllContext from "./allContext.jsx";

export default function AllState(props) {
  const baseUrl = "https://webshop9backend.onrender.com";

  const [fetchedAllProducts, setFetchedAllProducts] = useState([]);
  const [fetchedUserData, setFetchedUserData] = useState({});

  useEffect(() => {
    fetchAllProducts();
    fetchUserData();
  }, []);

  //Fetch all products
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
      return jsonres.products
    } else {
      alert(jsonres.error);
    }
  };

  //fetch product by id
  const [singleProduct,setSingleProduct]=useState({});
  const fetchProductById = async (itemId) => {
    const apires = await fetch(`${baseUrl}/v1/api/product/fetchProductById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      // console.log(jsonres.products);
      // setSingleProduct(jsonres.products);
      return jsonres.products;
    } else {
      alert(jsonres.error);
    }
  };

  //fetchUserCart
  const [fetchedUserCart, setFetchedUserCart] = useState([]);
  const fetchUserCart = async () => {
    const apires = await fetch(`${baseUrl}/v1/api/cart/getUserCart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      setFetchedUserCart(jsonres.cartData);
    } else {
      alert(jsonres.error);
    }
  };

  //addToCart
  const addToCart = async (itemId) => {
    const apires = await fetch(`${baseUrl}/v1/api/cart/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
      body: JSON.stringify({
        itemId,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      console.log(jsonres.message);
    } else {
      alert(jsonres.error);
    }
  };

  //deleteFromCart
  const deleteFromCart = async (itemId) => {
    const apires = await fetch(`${baseUrl}/v1/api/cart/deleteFromCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
      body: JSON.stringify({
        itemId,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      console.log(jsonres.message);
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
      body: JSON.stringify({
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
      body: JSON.stringify({
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

  //Fetch user Data
  const fetchUserData = async () => {
    const apires = await fetch(`${baseUrl}/v1/api/auth/fetchuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      setFetchedUserData(jsonres.user);
    } else {
      alert(jsonres.error);
    }
  };

  return (
    <AllContext.Provider
      value={{
        fetchedAllProducts,
        fetchAllProducts,
        userSignUp,
        userLogin,
        fetchedUserData,
        fetchUserData,
        fetchedUserCart,
        fetchUserCart,
        addToCart,
        deleteFromCart,
        fetchProductById,
        singleProduct,
      }}
    >
      {props.children}
    </AllContext.Provider>
  );
}
