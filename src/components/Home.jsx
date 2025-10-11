import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const context = useContext(allContext);
  const {
    fetchAllProducts,
    fetchedAllProducts,
    fetchUserCart,
    addToCart,
    deleteFromCart,
    fetchUserData,
    fetchedUserData,
  } = context;
  useEffect(() => {
    fetchUserData();
    fetchAllProducts();
  }, []);

  return (
    // <div className='h-[80vh] w-full flex items-center justify-center '>

    <div className="m-4 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {fetchedAllProducts.map((product) => {
        let temp = 0;

        fetchedUserData.cartData.map((cartItem) => {
          if (cartItem.itemId == product._id) {
            temp = cartItem.quantity;
          }
        });

        return (
          <Card key={product._id} className="w-full max-w-sm ">
            <div className="m-auto">
              <img
                className="h-[150px] w-[250px]"
                src="src/assets/product.png"
                alt=""
              />
            </div>
            <div className="m-5">
              <h2 className="font-bold">{product.name}</h2>
              <h4 className="text-sm">
                <sup>{product.weight} grams</sup>
              </h4>
              <h3 className="text-md">{product.desc}</h3>
              <div className="flex items-center justify-between">
                <h4 className="font-bold">€ {product.price}</h4>
                <div
                  className="inline-flex items-center"
                  role="group"
                  aria-labelledby="volume-control"
                >
                  <Button
                    className="rounded-lg"
                    variant="outline"
                    size="icon"
                    aria-label="Decrease volume"
                    onClick={async () => {
                      await deleteFromCart(product._id);
                      window.location.reload(false);
                    }}
                    // disabled={volume === 0}
                  >
                    <MinusIcon size={16} aria-hidden="true" />
                  </Button>
                  <div
                    className="flex items-center px-3 text-sm font-medium tabular-nums"
                    aria-live="polite"
                  >
                    {temp}
                  </div>
                  <Button
                    className="rounded-lg"
                    variant="outline"
                    size="icon"
                    aria-label="Increase volume"
                    onClick={async () => {
                      await addToCart(product._id);
                      window.location.reload(false);
                    }}
                    // disabled={volume === 6}
                  >
                    <PlusIcon size={16} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
