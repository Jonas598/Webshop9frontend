import React, { useContext, useEffect, useState } from "react";
import allContext from "../contexts/allContext.jsx";
import OrderedProducts from "./OrderedProducts.jsx";

const Orders = () => {
  const { getallorders, getsingleorder, allOrders } = useContext(allContext);

  // const [orders, setOrders] = useState([]);
  // const [orderIds, setOrderIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getallorders();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center">
        <p className="text-red-600">Error loading orders: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <h1 className="font-bold text-4xl mb-6">Orders</h1>

      <table className="min-w-[90%] border border-gray-300 shadow-md rounded-2xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-center">Order ID</th>
            <th className="border px-8 py-6 text-center">Name</th>
            <th className="border px-0 py-2 text-center">Address</th>
            <th className="border px-4 py-2 text-center">Items</th>
            <th className="border px-2 py-2 text-center">Order Status</th>
            <th className="border px-2 py-2 text-center">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-50 transition align-middle"
            >
              <td className="border px-4 py-5 text-center">{`${order._id.slice(
                0,
                7
              )}...`}</td>

              {/* Combine first and last name */}
              <td className="border px-4 py-3 text-center">{order.name}</td>

              {/* Combine all address fields */}
              <td className="border px-0 py-3 text-center">{order.address}</td>

              <td className="border px-4 py-3 text-center">
                {order.products.map((eachProduct)=>{
                 return <div className="" key={eachProduct._id}>
                <OrderedProducts itemId={eachProduct.itemId} quantity ={eachProduct.quantity} />
                 </div>
                })}
              </td>

              <td className="border px-2 py-3 text-center text-green-600">
                {order.order_status}
              </td>
              <td className="border px-4 py-3 font-bold text-center">
                {order.total_price.toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {allOrders.length == 0 && (
        <div className="m-20 h-60 w-45 flex items-center justify-center border rounded-lg">
          {" "}
          <p className="font-bold">No Order Found !!</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
