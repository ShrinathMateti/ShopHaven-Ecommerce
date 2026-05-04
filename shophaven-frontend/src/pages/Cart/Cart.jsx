import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart';
import { NumberInput } from '../../components/NumberInput/NumberInput';
import { delteItemFromCartAction, updateItemToCartAction } from '../../store/actions/cartAction';
import DeleteIcon from '../../components/common/DeleteIcon';
import Modal from 'react-modal';
import { customStyles } from '../../styles/modal';
import { isTokenValid } from '../../utils/jwt-helper';
import { Link, useNavigate } from 'react-router-dom';
import EmptyCart from '../../assets/img/empty_cart.png';

const headers = [
  "Product Details", "Price", "Quantity", "Shipping", "Subtotal", "Action"
];

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = isTokenValid();

  const onChangeQuantity = useCallback((value, productId, variantId) => {
    dispatch(updateItemToCartAction({ productId, variant_id: variantId, quantity: value }));
  }, [dispatch]);

  const onDeleteProduct = useCallback((productId, variantId) => {
    setDeleteItem({ productId, variantId });
    setModalIsOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setDeleteItem({});
    setModalIsOpen(false);
  }, []);

  const onDeleteItem = useCallback(() => {
    dispatch(delteItemFromCartAction(deleteItem));
    setModalIsOpen(false);
  }, [deleteItem, dispatch]);

  const onApplyCoupon = useCallback((e) => {
    e.preventDefault();
    // TODO: dispatch coupon action with couponCode
  }, [couponCode]);

  const subTotal = useMemo(() => {
    const value = cartItems?.reduce((acc, item) => acc + (item?.subTotal ?? 0), 0) ?? 0;
    return value.toFixed(2);
  }, [cartItems]);

  return (
    <>
      <div className="min-h-screen bg-zinc-50 px-4 py-10 sm:px-6 lg:px-10">

        {/* ── Filled cart ── */}
        {cartItems?.length > 0 && (
          <div className="mx-auto max-w-7xl space-y-8">

            {/* Page heading */}
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Shopping Cart</h1>
              <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                {cartItems.length}
              </span>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

              {/* ── Items table ── */}
              <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50">
                      {headers.map(header => (
                        <th
                          key={header}
                          scope="col"
                          className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-zinc-400"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {cartItems.map((item, index) => (
                      <tr
                        key={item?.variant?.id ?? index}
                        className="group transition-colors duration-150 hover:bg-zinc-50/70"
                      >
                        {/* Product details */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100">
                              <img
                                src={item?.thumbnail}
                                alt={item?.name ?? `Product ${index + 1}`}
                                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-zinc-900 leading-tight">
                                {item?.name ?? 'Product'}
                              </p>
                              <p className="text-xs text-zinc-400">
                                Size: <span className="text-zinc-600">{item?.variant?.size}</span>
                              </p>
                              <p className="text-xs text-zinc-400">
                                Color: <span className="text-zinc-600">{item?.variant?.color}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-4">
                          <span className="font-medium text-zinc-700">${item?.price}</span>
                        </td>

                        {/* Quantity */}
                        <td className="px-5 py-4">
                          <NumberInput
                            max={item?.stock ?? 10}
                            quantity={item?.quantity}
                            onChangeQuantity={(value) =>
                              onChangeQuantity(value, item?.productId, item?.variant?.id)
                            }
                          />
                        </td>

                        {/* Shipping */}
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                            FREE
                          </span>
                        </td>

                        {/* Subtotal */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-zinc-900">
                            ${Number(item?.subTotal ?? 0).toFixed(2)}
                          </span>
                        </td>

                        {/* Delete */}
                        <td className="px-5 py-4">
                          <button
                            aria-label={`Remove ${item?.name ?? 'item'} from cart`}
                            onClick={() => onDeleteProduct(item?.productId, item?.variant?.id)}
                            className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Order summary sidebar ── */}
              <div className="w-full shrink-0 space-y-4 lg:w-80">

                {/* Coupon */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="mb-1 font-semibold text-zinc-900">Discount Coupon</p>
                  <p className="mb-4 text-xs text-zinc-400">Have a code? Enter it below.</p>
                  <form onSubmit={onApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      aria-label="Coupon code"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="h-10 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
                    />
                    <button
                      type="submit"
                      className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 active:bg-zinc-800"
                    >
                      Apply
                    </button>
                  </form>
                </div>

                {/* Totals */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <p className="mb-4 font-semibold text-zinc-900">Order Summary</p>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-zinc-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-zinc-900">${subTotal}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Shipping</span>
                      <span className="font-medium text-emerald-600">Free</span>
                    </div>
                    <div className="my-1 border-t border-zinc-100" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-zinc-900">Grand Total</span>
                      <span className="text-lg font-bold text-zinc-900">${subTotal}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {isLoggedIn ? (
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-700 hover:shadow-md active:scale-[0.98] cursor-pointer"
                      >
                        Proceed to Checkout
                      </button>
                    ) : (
                      <Link
                        to="/v1/login"
                        className="flex w-full items-center justify-center rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-700 hover:shadow-md"
                      >
                        Login to Checkout
                      </Link>
                    )}
                    <Link
                      to="/"
                      className="flex w-full items-center justify-center rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!cartItems?.length && (
          <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
            <div className="mb-6 size-48 opacity-60">
              <img src={EmptyCart} alt="Your cart is empty" className="size-full object-contain" />
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900">
              Your cart is empty
            </h2>
            <p className="mb-8 text-sm text-zinc-400">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/"
              className="rounded-xl bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-700 hover:shadow-md active:scale-[0.98]"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* ── Delete confirmation modal ── */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Remove Item"
        aria={{ labelledby: 'modal-title', describedby: 'modal-desc' }}
      >
        <div className="p-2">
          <p id="modal-title" className="text-base font-semibold text-zinc-900">
            Remove item
          </p>
          <p id="modal-desc" className="mt-1 text-sm text-zinc-500">
            Are you sure you want to remove this item from your cart?
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCloseModal}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteItem}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 active:bg-red-800"
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cart;