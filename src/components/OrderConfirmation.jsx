import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <CheckCircle2 className="text-black w-24 h-24 mb-6" />
      <h1 className="text-4xl font-bold mb-2">Thank you for your order!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your order has been placed successfully.
      </p>
      <Link to="/home">
        <button className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;