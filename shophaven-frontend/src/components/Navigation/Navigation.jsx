import { Wishlist } from "../common/Wishlist";
import { AccountIcon } from "../common/AccountIcon";
import { CartIcon } from "../common/CartIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {countCartItems} from "../../store/features/cart"
import {useSelector} from "react-redux"
import "./Navigation.css";

const Navigation = ({ variant = "default" }) => {
  const cartLength = useSelector(countCartItems);
  const navigate = useNavigate();

  return (
    <nav className="flex items-center py-4 px-6 md:px-16 justify-between gap-6 md:gap-20 custom-nav border-b border-gray-300 shadow-emerald-50">
      
      {/* Logo */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-3xl text-black font-bold">
          ShopHaven
        </Link>
      </div>

      {/* Nav Links */}
      {variant === "default" && (
        <ul className="flex gap-10 text-gray-600">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "hover:text-black"}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/men" className={({ isActive }) => isActive ? "active-link" : "hover:text-black"}>
              Men
            </NavLink>
          </li>
          <li>
            <NavLink to="/women" className={({ isActive }) => isActive ? "active-link" : "hover:text-black"}>
              Women
            </NavLink>
          </li>
          <li>
            <NavLink to="/kids" className={({ isActive }) => isActive ? "active-link" : "hover:text-black"}>
              Kids
            </NavLink>
          </li>
        </ul>
      )}

      {/* Search */}
      {variant === "default" && (
        <div className="flex items-center border border-gray-400 rounded overflow-hidden">
          <div className="px-3 flex items-center">
            <svg
              className="h-4 w-4 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </div>
          <input
            type="text"
            className="px-3 py-2 outline-none"
            placeholder="Search"
          />
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Default Icons */}
        {variant === "default" && (
          <ul className="flex gap-6 items-center">
            <li>
              <button className="cursor-pointer" aria-label="Wishlist">
                <Wishlist />
              </button>
            </li>
            <li>
              <button
                className="cursor-pointer"
                aria-label="Account"
                onClick={() => navigate("/account-details/profile")}
              >
                <AccountIcon />
              </button>
            </li>
            <li>
              <Link to="/cart-items" className="relative flex flex-wrap">
                <CartIcon />
                {cartLength > 0 && <div className='absolute ml-6 inline-flex items-center justify-center h-6 w-6 bg-black text-white rounded-full border-2 text-xs border-white'>{cartLength}</div>}
              </Link>
            </li>
          </ul>
        )}

        {/* Auth Buttons */}
        {variant === "auth" && (
          <ul className="flex gap-4">
            <li>
              <NavLink
                to="/v1/login"
                className="border border-black px-5 py-2 rounded-lg text-sm hover:bg-gray-100"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/v1/register"
                className="border border-black px-5 py-2 rounded-lg text-sm hover:bg-gray-100"
              >
                Signup
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;