import React, { useCallback, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { placeOrderAPI } from '../../api/order';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/features/cart';
import { createOrderRequest } from '../../utils/order-util';
import { setLoading } from '../../store/features/common';

const CheckoutForm = ({ userId, addressId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    dispatch(setLoading(true));
    setError('');

    const orderRequest = createOrderRequest(cartItems, userId, addressId);

    // Validate Stripe elements first
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message);
      dispatch(setLoading(false));
      return;
    }

    try {
      // Step 1: create order + get client_secret
      const res = await placeOrderAPI(orderRequest);

      const clientSecret = res?.credentials?.client_secret;

      if (!clientSecret) {
        throw new Error("Missing client secret");
      }

      // Step 2: confirm payment (Stripe handles redirect)
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/confirmPayment",
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      }

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }

  }, [stripe, elements, cartItems, userId, addressId, dispatch]);

  return (
    <form className='items-center p-2 mt-4 w-[320px] h-80' onSubmit={handleSubmit}>
      <PaymentElement />

      <button
        type='submit'
        disabled={!stripe}
        className='w-37.5 h-12 bg-black border rounded-lg mt-4 text-white hover:bg-gray-800'
      >
        Pay Now
      </button>

      {error && <p className='text-sm pt-4 text-red-600'>{error}</p>}
    </form>
  );
};

export default CheckoutForm;