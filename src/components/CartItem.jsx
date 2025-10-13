// cartitem.jsx

import React, { useContext, useEffect, useState } from "react";
import allContext from "../contexts/allContext";
import productImg from "/assets/product.png";

const CartItem = ({ itemId, quantity }) => {
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

  // Calculate the subtotal for this item
  const subtotal = (product.price * quantity).toFixed(2);

  return (
    // Haupt-Container: Volle Breite, Schatten für Tiefe, mehr Padding
    <div className="flex items-center w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md gap-6">
      {/* Bild */}
      <img
        className="h-24 w-24 object-cover rounded-md" // Etwas größer und mit abgerundeten Ecken
        src={productImg}
        alt={product.name}
      />

      {/* Produktinfos - Nimmt den restlichen Platz ein */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-500 text-sm">{product.weight} g</p>
        <p className="text-green-600 font-semibold mt-1">
          {product.avl_peices} pieces left
        </p>
      </div>

      {/* Menge und Preis - Rechts ausgerichtet */}
      <div className="flex flex-col items-end text-right">
        <p className="text-lg font-bold mb-1">€ {product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 mb-2">Quantity: {quantity}</p>
        <p className="text-md font-semibold">Subtotal: € {subtotal}</p>
      </div>
    </div>
  );
};

export default CartItem;