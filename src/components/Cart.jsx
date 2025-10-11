import React from "react";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState, useId } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  let id = 0;
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
  } = context;
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    fetchUserCart();
  }, []);

  const [cartTotal, setCartTotal] = useState([]);

  return (
    <div className=" flex flex-col items-center justify-center gap-8">
      <h1 className="font-bold text-6xl"> Cart</h1>
      <div className=" border rounded-lg grid grid-cols-1 sm:grid-cols-3 p-3 sm:p-8 ">
        {fetchedUserCart.map((eachCartItem) => {
          if (eachCartItem.quantity != 0) {
            id++;
            return (
              <div
                key={id}
                className="flex items-center justify-center"
              >
                <div>
                  <CartItem
                    itemId={eachCartItem.itemId}
                    setCartTotal={setCartTotal}
                    cartTotal={cartTotal}
                    quantity={eachCartItem.quantity}
                  />{" "}
                </div>
                <div className="text-2xl font-bold">
                  x {eachCartItem.quantity}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Cart;
