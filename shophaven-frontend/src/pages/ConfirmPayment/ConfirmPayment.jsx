import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPaymentAPI } from "../../api/order";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import Spinner from "../../components/Spinner/Spinner";
import { clearCart } from "../../store/actions/cartAction";

const ConfirmPayment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const isLoading = useSelector((state) => state?.commonState?.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const clientSecret = query.get("payment_intent_client_secret");
    const redirectStatus = query.get("redirect_status");
    const paymentIntent = query.get("payment_intent");
    if (redirectStatus === "succeeded") {
      // dispatch(setLoading(true));
      dispatch(clearCart());
      confirmPaymentAPI({
        paymentIntent: paymentIntent,
        status: paymentIntent,
      })
        .then((res) => {
          const orderId = res?.orderId;
          navigate(`/orderConfirmed?orderId=${orderId}`);
        })
        .catch((err) => {
          setErrorMessage("Something went wrong!");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      setErrorMessage("Payment Failed - " + redirectStatus);
    }
  }, [dispatch, location.search, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center space-y-6">
          <div className="relative w-14 h-14 mx-auto">
            <div className="absolute inset-0 rounded-full bg-white/10 blur-lg"></div>
            <div className="absolute inset-0 rounded-full border border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-t-white border-2 animate-spin"></div>
          </div>
          <p className="text-white/90 text-sm tracking-wide">
            Just a sec—finishing your payment…
          </p>
          <div className="flex justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </div>
        </div>
      </div>
      {isLoading && <Spinner />}
    </>
  );
};

export default ConfirmPayment;
