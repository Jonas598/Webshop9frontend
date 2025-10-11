import React from "react";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState, useId } from "react";
import product from '/assets/product.png'

const CartItem = (props) => {
  const context = useContext(allContext);
  const {
    fetchAllProducts,
    fetchedAllProducts,
    fetchUserCart,
    fetchedUserCart,
    addToCart,
    deleteFromCart,
    fetchUserData,
    fetchedUserData,
    fetchProductById,
    singlrProduct,
  } = context;

  const [temp, setTemp] = useState({});

  const fetchSingleProduct = async (itemId) => {
    const productDeatils = await fetchProductById(itemId);
    setTemp(productDeatils);
    const newTotal = props.cartTotal;
    newTotal.push(productDeatils.price * props.quantity);
    props.setCartTotal(newTotal);
  };

  useEffect(() => {
    fetchSingleProduct(props.itemId);
  }, []);

  return (
    <div className="flex border rounded-lg m-3 p-1 h-20 w-70 gap-4">
      <div>
        <img
          className="h-[80px] w-[100px]"
          src={product}
          alt=""
        />
      </div>
      <div>
        <h2 className="text-md font-bold">{temp.name}</h2>
        <h3 className="text-sm ">
          <sup>{temp.weight} grams</sup>
        </h3>
        <h1 className=" text-sm font-bold"> € {temp.price}</h1>
      </div>
    </div>
  );
};

export default CartItem;
