import React, { useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'

const OrderConfirmed = () => {
  const location = useLocation();

  const orderId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get('orderId');
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full text-center">

        {/* Heading */}
        <h1 className="text-xl font-medium text-gray-900 mb-3">
          Order placed
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-sm mb-6">
          Thank you. Your order has been confirmed.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6"></div>

        {/* Order ID */}
        <p className="text-sm text-gray-500 mb-1">Order ID</p>
        <p className="text-base text-gray-900 tracking-wide mb-8">
          {orderId}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to={`/account-details/orders`}
            className="w-full border border-gray-900 text-gray-900 py-2 text-sm hover:bg-gray-900 hover:text-white transition"
          >
            View order
          </Link>

          <Link
            to="/"
            className="w-full border border-gray-900 py-2 text-sm bg-gray-900 text-white transition"
          >
            Continue shopping
          </Link>
        </div>

      </div>
    </div>
  )
}

export default OrderConfirmed;