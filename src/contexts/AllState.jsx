import React, { useEffect, useState } from "react";
import AllContext from "./allContext.jsx";

export default function AllState(props) {
  // const baseUrl = "https://webshop9backend.onrender.com";
  const baseUrl = "http://localhost:3000";

  const [fetchedAllProducts, setFetchedAllProducts] = useState([]);
  const [fetchedUserData, setFetchedUserData] = useState({});

  useEffect(() => {
    getallorders();
    // fetchAllProducts();
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
      return jsonres.products;
    } else {
      alert(jsonres.error);
    }
  };

  //fetch product by id
  const [singleProduct, setSingleProduct] = useState({});
  const fetchProductById = async (itemId) => {
    // console.log(itemId);

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
      setSingleProduct(jsonres.products);
      // console.log(jsonres.products);
      return jsonres.products;
    } else {
      alert(jsonres.error);
    }
  };

  //add Product
  const addProduct = async (productInfo) => {
    const { name, desc, productId, price, avl_peices } = productInfo;
    const apires = await fetch(`${baseUrl}/v1/api/product/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        desc,
        productId,
        price,
        avl_peices,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      console.log(jsonres.msg);
    } else {
      alert(jsonres.error);
    }
  };

  //delete Product
  const deleteProduct = async (id) => {
    const apires = await fetch(`${baseUrl}/v1/api/product/deleteProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      console.log(jsonres.message);
    } else {
      alert(jsonres.error);
    }
  };

  //update product
  const updateProduct = async (productInfo) => {
    const apires = await fetch(`${baseUrl}/v1/api/product/updateproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productInfo.id,
        name: productInfo.name,
        desc: productInfo.desc,
        productId: productInfo.productId,
        price: productInfo.price,
        avl_peices: productInfo.avl_peices,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      console.log(jsonres.msg);
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

  //updateuserdata
  const updateuser = async (userInfo) => {
    const apires = await fetch(`${baseUrl}/v1/api/auth/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
      body: JSON.stringify({
        name: userInfo.name,
        address: userInfo.address,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      console.log(jsonres.message);
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

  // create order
  const createOrder = async (orderInfo) => {
    const {
      userId,
      name,
      email,
      address,
      total_price,
      order_status,
      products,
    } = orderInfo;
    const apires = await fetch(`${baseUrl}/v1/api/cart/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
      body: JSON.stringify({
        userId,
        name,
        email,
        address,
        total_price,
        order_status,
        products,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      return jsonres.data;
    } else {
      alert(jsonres.error);
    }
  };

  //Get All Orders
  const [allOrders, setAllOrders] = useState([]);
  const getallorders = async () => {
    const apires = await fetch(`${baseUrl}/v1/api/cart/getallorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      setAllOrders(jsonres.OrderData);
      return jsonres.OrderData;
    } else {
      alert(jsonres.error);
    }
  };

  //Get Order by id
  const getsingleorder = async (orderId) => {
    const apires = await fetch(`${baseUrl}/v1/api/cart/getsingleorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("webshopAuthtoken"),
      },
      body: JSON.stringify({
        orderId,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      return jsonres.orderDetails;
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
        updateuser,
        addProduct,
        deleteProduct,
        updateProduct,
        createOrder,
        getallorders,
        getsingleorder,
        allOrders,
      }}
    >
      {props.children}
    </AllContext.Provider>
  );
}
