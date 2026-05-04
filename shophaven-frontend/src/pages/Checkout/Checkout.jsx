import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/features/cart";
import { fetchUserDetails } from "../../api/userInfo";
import { setLoading } from "../../store/features/common";
import PaymentPage from "../PaymentPage/PaymentPage";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const deliveryDates = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);

      return {
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
        value: d.toISOString(),
      };
    });
  }, []);

  useEffect(() => {
    if (!selectedDate && deliveryDates.length) {
      setSelectedDate(deliveryDates[0].value);
    }
  }, [deliveryDates, selectedDate]);

  const subTotal = useMemo(() => {
    return (cartItems?.reduce((a, c) => a + (c?.subTotal || 0), 0) || 0).toFixed(2);
  }, [cartItems]);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then(setUserInfo)
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  return (
    <div className="min-h-screen px-6 py-10">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_0.8fr] gap-10">

        {/* LEFT FLOW */}
        <div className="space-y-10">

          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Checkout
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review and complete your order
            </p>
          </div>

          {/* ADDRESS */}
          <section>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
              Delivery
            </p>

            <div className="text-sm text-gray-700 leading-relaxed">
              {userInfo?.addressList?.[0] ? (
                <>
                  <p className="font-medium text-black">
                    {userInfo.addressList[0].name}
                  </p>
                  <p>{userInfo.addressList[0].street}</p>
                  <p>
                    {userInfo.addressList[0].city},{" "}
                    {userInfo.addressList[0].state}{" "}
                    {userInfo.addressList[0].zipCode}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">No address available</p>
              )}
            </div>
          </section>

          {/* DELIVERY DATES */}
          <section>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
              Delivery date
            </p>

            <div className="flex flex-wrap gap-2">
              {deliveryDates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d.value)}
                  className={`px-4 py-2 text-sm rounded-full border transition
                    ${
                      selectedDate === d.value
                        ? "bg-black text-white border-black"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </section>

          {/* PAYMENT */}
          <section>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
              Payment
            </p>

            <div className="space-y-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pay"
                  onChange={() => setPaymentMethod("STRIPE")}
                />
                Card / UPI
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pay"
                  onChange={() => setPaymentMethod("COD")}
                />
                Cash on Delivery
              </label>
            </div>
          </section>

          {/* ACTION */}
          {paymentMethod === "STRIPE" && (
            <PaymentPage
              userId={userInfo?.id}
              addressId={userInfo?.addressList?.[0]?.id}
              amount={subTotal}
            />
          )}

          {paymentMethod === "COD" && (
            <button className="w-50 bg-black text-white py-3 rounded-xl text-sm hover:opacity-90 transition">
              Place Order
            </button>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:sticky lg:top-10 h-fit">
          <div className="bg-white/70 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-sm">

            <h2 className="text-sm font-semibold mb-5">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems?.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="my-5 border-t border-gray-100"></div>

            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${subTotal}</span>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              Secure checkout powered by encrypted payment processing
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;