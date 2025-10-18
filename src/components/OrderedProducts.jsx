import React, { useContext, useEffect, useState } from "react";
import allContext from "../contexts/allContext";

const OrderedProducts = ({ itemId, quantity }) => {
  const { fetchProductById } = useContext(allContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(itemId);
      setProduct(data);
    };
    loadProduct();
  }, [itemId]);
  if (!product) {
    return (
      <div className="w-full p-4 text-center text-gray-500">Loading...</div>
    );
  }
  return <div className="flex justify-around p-1">
    <div className=" ">
      <h2 className="font-semibold text-sm">{product.name}</h2>
      {/* <h2 className="text-left"><sup>{product.weight} grams</sup></h2> */}
    </div>
    <h2>x</h2>
    <div>
      <h2 className="font-semibold">{quantity}</h2>
    </div>
  </div>;
};

export default OrderedProducts;
