import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { cancelOrderAPI, fetchOrderAPI } from "../../api/userInfo";
import { cancelOrder, loadOrders, selectAllOrders } from "../../store/features/user";
import moment from "moment";
import Timeline from "../../components/Timeline/Timeline";
import { getStepCount } from "../../utils/order-util";



const toDisplayStatus = (orderStatus) => {
  if (["PENDING", "IN_PROGRESS", "SHIPPED"].includes(orderStatus)) return "ACTIVE";
  if (orderStatus === "DELIVERED") return "COMPLETED";
  return orderStatus;
};

const STATUS_PILL = {
  PENDING:     "bg-amber-50 text-amber-700 border-amber-200",
  IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED:     "bg-indigo-50 text-indigo-700 border-indigo-200",
  DELIVERED:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED:   "bg-red-50 text-red-500 border-red-200",
};

const FILTERS = ["ACTIVE", "COMPLETED", "CANCELLED"];



const FilterTab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={[
      "px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-150",
      active
        ? "bg-stone-900 text-white shadow-sm"
        : "text-stone-500 hover:text-stone-900 hover:bg-stone-100",
    ].join(" ")}
  >
    {label}
  </button>
);

const OrderItem = ({ item }) => (
  <div className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-0">
    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
      <img
        src={item?.url}
        alt={item?.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-stone-800 truncate">{item?.name}</p>
      <p className="text-xs text-stone-400 mt-0.5">Qty: {item?.quantity}</p>
    </div>
    <p className="text-sm font-semibold text-stone-700 shrink-0">
      ${(item?.price * item?.quantity).toFixed(2)}
    </p>
  </div>
);

const OrderCard = ({ order, isExpanded, onToggle, onCancel }) => {
  const pillClass = STATUS_PILL[order?.orderStatus] ?? "bg-stone-100 text-stone-600 border-stone-200";
  const canCancel = getStepCount[order?.orderStatus] <= 2;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Card header */}
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-stone-400 font-medium tracking-widest uppercase mb-1">
            Order #{order?.id}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
            <span>
              <span className="text-stone-400">Placed</span>{" "}
              {moment(order?.orderDate).format("MMM DD, YYYY")}
            </span>
            <span>
              <span className="text-stone-400">Est. delivery</span>{" "}
              {moment(order?.orderDate).add(3, "days").format("MMM DD, YYYY")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`text-[11px] font-bold tracking-widest uppercase border px-2.5 py-1 rounded-full ${pillClass}`}>
            {order?.orderStatus?.replace("_", " ")}
          </span>
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 px-3 py-1.5 rounded-full transition-all duration-150"
          >
            {isExpanded ? "Hide" : "Details"}
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="border-t border-stone-100 px-5 pb-5 pt-4">

          {/* Items */}
          <div className="mb-4">
            {order?.items?.map((item, i) => (
              <OrderItem key={item?.id ?? i} item={item} />
            ))}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between py-3 border-t border-stone-200">
            <span className="text-xs font-semibold tracking-widest uppercase text-stone-400">
              Order Total
            </span>
            <span className="text-base font-bold text-stone-900">
              ${Number(order?.totalAmount).toFixed(2)}
            </span>
          </div>

          {/* Timeline + cancel */}
          {order?.orderStatus !== "CANCELLED" && (
            <div className="mt-4">
              <Timeline stepCount={getStepCount[order?.orderStatus]} />
              {canCancel && (
                <button
                  onClick={() => onCancel(order?.id)}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-red-500 hover:text-white hover:bg-red-500 border border-red-300 hover:border-red-500 px-4 py-2 rounded-full transition-all duration-150"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel Order
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};



const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");

  useEffect(() => {
    dispatch(setLoading(true));
    fetchOrderAPI()
      .then((res) => dispatch(loadOrders(res)))
      .catch(() => {})
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    const mapped = (allOrders ?? []).map((order) => ({
      id: order?.id,
      orderDate: order?.orderDate,
      orderStatus: order?.orderStatus,
      status: toDisplayStatus(order?.orderStatus),
      items: order?.orderItemList?.map((item) => ({
        id: item?.id,
        name: item?.product?.name,
        price: item?.product?.price,
        quantity: item?.quantity,
        url: item?.product?.resources?.[0]?.url,
        slug: item?.product?.slug,
      })),
      totalAmount: order?.totalAmount,
    }));
    setOrders(mapped);
  }, [allOrders]);

  const onCancelOrder = useCallback(
    (id) => {
      dispatch(setLoading(true));
      cancelOrderAPI(id)
        .then(() => dispatch(cancelOrder(id)))
        .catch(() => {})
        .finally(() => dispatch(setLoading(false)));
    },
    [dispatch]
  );

  const filteredOrders = orders.filter((o) => o.status === selectedFilter);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-lg font-bold tracking-tight text-stone-900">My Orders</h1>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full">
          {FILTERS.map((f) => (
            <FilterTab
              key={f}
              label={f}
              active={selectedFilter === f}
              onClick={() => setSelectedFilter(f)}
            />
          ))}
        </div>
      </div>

      {/* Order list */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <OrderCard
              key={order?.id ?? index}
              order={order}
              isExpanded={selectedOrder === order?.id}
              onToggle={() =>
                setSelectedOrder((prev) => (prev === order?.id ? "" : order?.id))
              }
              onCancel={onCancelOrder}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-stone-50 border border-dashed border-stone-300 rounded-2xl py-16 text-center">
          <svg className="w-8 h-8 text-stone-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
          <p className="text-sm font-medium text-stone-500">
            No {selectedFilter.toLowerCase()} orders
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;