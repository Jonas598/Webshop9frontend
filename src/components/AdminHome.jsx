import React from "react";
import { Card } from "@/components/ui/card";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState } from "react";
import product from "/assets/product.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminHome = () => {
  const navigate = useNavigate();
  const context = useContext(allContext);
  const { fetchAllProducts, fetchedAllProducts } = context;
  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (!localStorage.getItem("webshopAuthtoken")) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" text-center text-4xl font-bold ">ADMIN CONTROL PANEL</h1>
      <Button className="mt-15 text-2xl p-8 rounded-2xl">
        + Add New Product
      </Button>
      <div className="m-4 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {fetchedAllProducts.map((product) => {
          return (
            <Card key={product._id} className="  ">
              <div className="flex gap-4 items-center py-2 px-6 ">
                <div className="m-auto">
                  <img
                    className="  h-[80px] w-[120px]"
                    src="/assets/product.png"
                    alt=""
                  />
                </div>
                <div className="">
                  <h2 className="font-bold">{product.name}</h2>
                  <h4 className="text-sm">
                    <sup>{product.weight} grams</sup>
                  </h4>
                  <h3 className="text-md">{product.desc}</h3>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">€ {product.price}</h4>
                  </div>
                  <h4 className="">
                    <sup className="text-green-700 font-semibold">
                      {product.avl_peices} peices left !
                    </sup>
                  </h4>
                </div>
                <div className="flex flex-col gap-3">
                  <Button>UPDATE</Button>
                  <Button>DELETE</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminHome;
