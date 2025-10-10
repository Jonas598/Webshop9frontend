import React from "react";
import { Card } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const context = useContext(allContext);
  const { fetchAllProducts, fetchedAllProducts } = context;
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    // <div className='h-[80vh] w-full flex items-center justify-center '>

    <div className="m-4 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {console.log(fetchedAllProducts)}
      {fetchedAllProducts.map((product) => {
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
              <h4 className="font-bold">€ {product.price}</h4>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
