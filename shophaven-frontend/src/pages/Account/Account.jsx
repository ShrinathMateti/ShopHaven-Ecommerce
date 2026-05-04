import React, { useCallback, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { logOut } from "../../utils/jwt-helper";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
import { fetchUserDetails } from "../../api/userInfo";
import { loadUserInfo, selectIsUserAdmin, selectUserInfo } from "../../store/features/user";

const NAV_ITEMS = [
  {
    to: "/account-details/profile",
    label: "Profile",
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
    ),
  },
  {
    to: "/account-details/orders",
    label: "Orders",
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 19 19">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5833 7.39473L13.5138 6.45768C13.4501 5.59928 12.7083 4.93421 11.8146 4.93421H9.99368M3.5 16.4167H2.45365C1.465 16.4167 0.683979 15.609 0.754417 14.6594L1.36283 6.45769C1.42651 5.59928 2.16831 4.93421 3.06207 4.93421H4.88298M4.88298 4.93421V3.29385C4.88298 1.93494 6.02705 0.833328 7.43833 0.833328C8.84961 0.833328 9.99368 1.93494 9.99368 3.29385V4.93421M4.88298 4.93421H9.99368M13.5833 12.75C13.5833 13.7625 12.7625 14.5833 11.75 14.5833C10.7375 14.5833 9.91667 13.7625 9.91667 12.75M8.08333 18.25H15.4167C16.4292 18.25 17.25 17.4292 17.25 16.4167V11.8333C17.25 10.8208 16.4292 9.99999 15.4167 9.99999H8.08333C7.07081 9.99999 6.25 10.8208 6.25 11.8333V16.4167C6.25 17.4292 7.07081 18.25 8.08333 18.25Z" />
      </svg>
    ),
  },
  {
    to: "/account-details/settings",
    label: "Settings",
    icon: (
      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
      </svg>
    ),
  },
];

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const isUserAdmin = useSelector(selectIsUserAdmin);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchUserDetails()
      .then((res) => dispatch(loadUserInfo(res)))
      .catch(() => {})
      .finally(() => dispatch(setLoading(false)));
  }, []);

  const initials = userInfo?.firstName?.[0] ?? "" + userInfo?.lastName?.[0] ?? "";

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <div className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="text-xs text-stone-400 tracking-widest uppercase">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-stone-700 font-medium">My Account</span>
          </nav>
          {isUserAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-white bg-stone-900 hover:bg-stone-700 transition-colors px-4 py-2 rounded-full"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      {userInfo?.email && (
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Hero greeting */}
          <div className="mb-10 flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center text-lg font-bold tracking-wide shrink-0">
              <FaUser size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                Hello {userInfo?.firstName} 
              </h1>
              <p className="text-sm text-stone-500 mt-0.5">{userInfo?.email}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">

            {/* Sidebar nav */}
            <aside className="md:w-56 shrink-0">
              <nav className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                {NAV_ITEMS.map(({ to, label, icon }, i) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-3 px-5 py-4 text-sm font-medium transition-all duration-150 group",
                        i !== NAV_ITEMS.length - 1 ? "border-b border-stone-100" : "",
                        isActive
                          ? "bg-stone-900 text-white"
                          : "text-stone-600 hover:bg-stone-50 hover:text-stone-900",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={isActive ? "text-white" : "text-stone-400 group-hover:text-stone-600 transition-colors"}>
                          {icon}
                        </span>
                        {label}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </aside>

            {/* Main content panel */}
            <main className="flex-1 bg-white border border-stone-200 rounded-2xl shadow-sm p-6 md:p-8 min-h-105">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;