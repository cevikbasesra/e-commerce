import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you an email with your order
          details and tracking information once your order ships.
        </p>

        <div className="space-y-4">
          <Link
            to="/shop"
            className="block w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="block w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
