import React, { useCallback } from "react";
import { logOut } from "../../utils/jwt-helper";
import { useNavigate } from "react-router-dom";

const SettingRow = ({ icon, label, description, action }) => (
  <div className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-stone-800">{label}</p>
        {description && <p className="text-xs text-stone-400 mt-0.5">{description}</p>}
      </div>
    </div>
    {action}
  </div>
);

const Settings = () => {
  const navigate = useNavigate();

  const onLogOut = useCallback(() => {
    logOut();
    navigate("/");
  }, [navigate]);

  return (
    <div className="space-y-8">

      {/* Header */}
      <h1 className="text-lg font-bold tracking-tight text-stone-900">Settings</h1>

      

     
      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-3">
          Security
        </h2>
        <div className="bg-white border border-stone-200 rounded-2xl px-5 shadow-sm">
          <SettingRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            }
            label="Change Password"
            description="Update your account password"
            action={
              <button className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer">
                Update
              </button>
            }
          />
        </div>
      </section>

      
      <section>
        <h2 className="text-xs font-bold tracking-widest uppercase text-red-400 mb-3">
          Account
        </h2>
        <div className="bg-white border border-stone-200 rounded-2xl px-5 shadow-sm">
          <SettingRow
            icon={
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            }
            label="Sign Out"
            description="Log out of your account on this device"
            action={
              <button
                onClick={onLogOut}
                className="text-xs font-semibold text-red-500 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 px-4 py-1.5 rounded-full transition-all duration-150 cursor-pointer"
              >
                Sign Out
              </button>
            }
          />
        </div>
      </section>

    </div>
  );
};

export default Settings;