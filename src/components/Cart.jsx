import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import allContext from "../contexts/allContext";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const {
    fetchAllProducts,
    fetchUserCart,
    fetchedUserCart,
    fetchProductById,
    fetchUserData,
    fetchedUserData,
    createOrder,
  } = useContext(allContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [buyButton, setBuyButton] = useState("Buy");

  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    fetchUserCart();
    fetchUserData();
  }, []);

  useEffect(() => {
    const temp = async () => {
      await fetchAllProducts();
    };
    temp();
  });

  useEffect(() => {
    const calculateTotal = async () => {
      setLoading(true);
      let total = 0;
      for (const item of fetchedUserCart) {
        if (item.quantity > 0) {
          const product = await fetchProductById(item.itemId);
          if (product) {
            total += product.price * item.quantity;
          } else {
            fetchedUserCart.splice(fetchedUserCart.indexOf(item), 1)
            setLoading(false);
            continue;
          }
          if (product.avl_peices == 0) {
            setBackendError(true);
          }
        }
      }
      setTotalPrice(total);
      setLoading(false);
    };

    if (fetchedUserCart.length > 0) {
      calculateTotal();
    } else {
      setLoading(false);
    }
  }, [fetchedUserCart]);

  const orderInfo = {
    userId: fetchedUserData?._id,
    name: fetchedUserData?.name,
    email: fetchedUserData?.email,
    address: fetchedUserData?.address,
    total_price: totalPrice.toFixed(2),
    order_status: "Confirmed",
    products: fetchedUserCart,
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setBuyButton("Please Wait ...");
    await fetchAllProducts();
    for (const item of fetchedUserCart) {
      if (item.quantity > 0) {
        const product = await fetchProductById(item.itemId);
        if (product.avl_peices == 0) {
          setBackendError(true);
          window.location.reload(false);
          return;
        }
      }
    }
    setBuyButton("Buy");
    await createOrder(orderInfo);
    navigate("/order-success");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 my-10 px-4">
      <h1 className="font-bold text-6xl">Cart</h1>

      {loading ? (
        <p>Loading your cart...</p>
      ) : fetchedUserCart.length === 0 ||
        fetchedUserCart.every((item) => item.quantity === 0) ? (
        <div className="m-20 h-60 w-45 flex items-center justify-center border rounded-lg p-10">
          <p className="font-bold">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full max-w-3xl">
            {fetchedUserCart.map((eachCartItem) => {
              if (eachCartItem.quantity !== 0) {
                return (
                  <CartItem
                    key={eachCartItem.itemId}
                    itemId={eachCartItem.itemId}
                    quantity={eachCartItem.quantity}
                  />
                );
              }
              return null;
            })}
          </div>

          {/* Shipping Information */}
          {fetchedUserData && (
            <div className="w-full max-w-3xl mt-6 p-4 bg-gray-50 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Shipping to:</h2>
              <div className="text-gray-700">
                <p className="font-bold">{fetchedUserData.name}</p>
                <p>{fetchedUserData.address}</p>
                <p>{fetchedUserData.email}</p>
              </div>
            </div>
          )}

          {/* Total Price Display */}
          <div className="w-full max-w-3xl mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Total</h2>
            <p className="text-3xl font-bold">€ {totalPrice.toFixed(2)}</p>
          </div>

          <div className="w-full max-w-3xl mt-4">
            {backendError ? (
              <div className="p-3 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p>
                  Purchases are currently unavailable. Please try Removing
                  Unavailable Products.
                </p>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"
              >
                {buyButton}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
