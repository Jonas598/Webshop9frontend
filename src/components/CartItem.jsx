import React from "react";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useState, useId } from "react";
import product from '/assets/product.png'

const CartItem = (props) => {
  const context = useContext(allContext);
  const {
    fetchProductById,
    singleProduct,
  } = context;

  const [temp, setTemp] = useState({});

  const fetchSingleProduct = async (itemId) => {
    const productDeatils = await fetchProductById(itemId);
    setTemp(productDeatils);
  };

  useEffect(() => {
    // fetchProductById(props.itemId);
    fetchSingleProduct(props.itemId);
  }, []);

  return (
    // <div className="flex border rounded-lg m-3 p-1 h-25 w-70 gap-4">
    //   <div>
    //     <img
    //       className="h-[80px] w-[100px]"
    //       src={product}
    //       alt=""
    //     />
    //   </div>
    //   <div>
    //     <h2 className="text-md font-bold">{temp.name}</h2>
    //     <h3 className="text-sm ">
    //       <sup>{temp.weight} grams</sup>
    //     </h3>
    //     <h1 className=" text-sm font-bold"> € {temp.price}</h1>
    //           <h4 className=""><sup className="text-green-700 font-semibold">{temp.avl_peices} peices left !</sup></h4>

    //   </div>
    // </div>

    <>yet to be developed</>
  );
};

export default CartItem;

