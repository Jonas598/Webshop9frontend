import React, { useEffect, useState } from "react"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Mock API data (already split)
    const mockOrders = [
      {
        id: 1,
        name: { firstName: "Jamal", lastName: "Musiala" },
        address: {
          street: "Piezenauerstraße",
          houseNumber: "105",
          postalCode: "81925",
          city: "München",
          country: "Germany",
        },
        items: [
          { name: "Watermelon seeds", quantity: 4, price: 1.99 },
          { name: "Hibiscus seeds", quantity: 2, price: 2.99 },
        ],
        status: "Shipped",
      },
      {
        id: 2,
        name: { firstName: "Nick", lastName: "Woltemade" },
        address: {
          street: "Belgrave Parade",
          houseNumber: "9",
          postalCode: "NE4 6RE",
          city: "Newcastle upon Tyne",
          country: "United Kingdom",
        },
        items: [
          { name: "Sunflower seeds", quantity: 3, price: 2.59 },
          { name: "Lotus seeds", quantity: 5, price: 3.59 },
        ],
        status: "Processing",
      },
      {
        id: 3,
        name: { firstName: "Timothy", lastName: "Smallservice" },
        address: {
          street: "Königsallee",
          houseNumber: "74",
          postalCode: "40212",
          city: "Düsseldorf",
          country: "Germany",
        },
        items: [
          { name: "Lily seeds", quantity: 4, price: 1.79 },
        ],
        status: "Shipped",
      },
      {
        id: 4,
        name: { firstName: "Mario", lastName: "Götze" },
        address: {
          street: "Elbestraße",
          houseNumber: "29",
          postalCode: "60329",
          city: "Frankfurt am Main",
          country: "Germany",
        },
        items: [
          { name: "Watermelon seeds", quantity: 4, price: 1.99 },
          { name: "Hibiscus seeds", quantity: 2, price: 2.99 },
        ],
        status: "Shipped",
      },
      {
        id: 5,
        name: { firstName: "Felix", lastName: "Götze" },
        address: {
          street: "Kamp",
          houseNumber: "25",
          postalCode: "33098",
          city: "Paderborn",
          country: "Germany",
        },
        items: [
          { name: "Watermelon seeds", quantity: 4, price: 1.99 },
          { name: "Hibiscus seeds", quantity: 2, price: 2.99 },
        ],
        status: "Shipped",
      },
    ]

    // Calculate total price per order
    const ordersWithTotal = mockOrders.map((order) => ({
      ...order,
      total: order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }))

    setTimeout(() => {
      setOrders(ordersWithTotal)
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center">
        <p className="text-red-600">Error loading orders: {error}</p>
      </div>
    )
  }

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <h1 className="font-bold text-4xl mb-6">Orders</h1>

      <table className="min-w-[90%] border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Address</th>
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Items</th>
            <th className="border px-4 py-2 text-left">Order Status</th>
            <th className="border px-4 py-2 text-left">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition align-top">
              {/* Combine first and last name */}
              <td className="border px-4 py-2">{order.name.firstName} {order.name.lastName}</td>

              {/* Combine all address fields */}
              <td className="border px-4 py-2">
                {order.address.street} {order.address.houseNumber}, {order.address.postalCode} {order.address.city}, {order.address.country}
              </td>

              <td className="border px-4 py-2">{order.id}</td>

              <td className="border px-4 py-2">
                <table className="w-full">
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="pr-2 w-12">{item.quantity}x</td>
                        <td className="pr-2">{item.name}</td>
                        <td className="text-right w-20">{(item.quantity * item.price).toFixed(2)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>

              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2 font-bold">{order.total.toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <p className="text-gray-500 mt-4">No orders found.</p>
      )}
    </div>
  )
}

export default Orders
