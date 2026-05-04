import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, selectUserInfo } from "../../store/features/user";
import AddAddress from "./AddAddress";
import { setLoading } from "../../store/features/common";
import { deleteAddressAPI } from "../../api/userInfo";

const InfoRow = ({ label, value }) => (
  <div className="py-3.5 border-b border-stone-100 last:border-0">
    <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1">{label}</p>
    <p className="text-sm text-stone-800">{value || "—"}</p>
  </div>
);

const AddressCard = ({ address, onEdit, onDelete }) => (
  <div className="group relative bg-stone-50 border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-sm transition-all duration-200">
    {/* Default badge — optional, wire up logic if you track default */}
    {address?.isDefault && (
      <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase bg-stone-900 text-white px-2 py-0.5 rounded-full">
        Default
      </span>
    )}
    <p className="font-semibold text-stone-900 text-sm mb-1">{address?.name}</p>
    <p className="text-xs text-stone-500 mb-1">{address?.phoneNumber}</p>
    <p className="text-xs text-stone-600 leading-relaxed">
      {address?.street},<br />
      {address?.city}, {address?.state} — {address?.zipCode}
    </p>
    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-stone-200">
      <button
        onClick={onEdit}
        className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
      >
        Edit
      </button>
      <span className="text-stone-300">|</span>
      <button
        onClick={onDelete}
        className="text-xs font-medium text-red-400 hover:text-red-600 transition-colors"
      >
        Remove
      </button>
    </div>
  </div>
);

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const [addAddress, setAddAddress] = useState(false);
  const dispatch = useDispatch();

  const onDeleteAddress = useCallback(
    (id) => {
      dispatch(setLoading(true));
      deleteAddressAPI(id)
        .then(() => dispatch(removeAddress(id)))
        .catch(() => {})
        .finally(() => dispatch(setLoading(false)));
    },
    [dispatch]
  );

  if (addAddress) {
    return <AddAddress onCancel={() => setAddAddress(false)} />;
  }

  return (
    <div className="space-y-8">

      {/* Section header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight text-stone-900">My Profile</h1>
      </div>

      {/* Contact details card */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-500">
            Contact Details
          </h2>
          <button className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 px-3 py-1.5 rounded-full transition-all duration-150">
            Edit
          </button>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl px-5 shadow-sm divide-y divide-stone-100">
          <InfoRow label="Full Name" value={`${userInfo?.firstName ?? ""} ${userInfo?.lastName ?? ""}`.trim()} />
          <InfoRow label="Email" value={userInfo?.email} />
          <InfoRow label="Phone Number" value={userInfo?.phoneNumber} />
        </div>
      </section>

      {/* Addresses */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold tracking-widest uppercase text-stone-500">
            Saved Addresses
          </h2>
          <button
            onClick={() => setAddAddress(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-700 px-3 py-1.5 rounded-full transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New
          </button>
        </div>

        {userInfo?.addressList?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userInfo.addressList.map((address, index) => (
              <AddressCard
                key={address?.id ?? index}
                address={address}
                onEdit={() => {/* wire up edit */}}
                onDelete={() => onDeleteAddress(address?.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center bg-stone-50 border border-dashed border-stone-300 rounded-2xl py-12 text-center">
            <svg className="w-8 h-8 text-stone-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <p className="text-sm font-medium text-stone-500">No saved addresses yet</p>
            <button
              onClick={() => setAddAddress(true)}
              className="mt-3 text-xs font-semibold text-stone-900 underline underline-offset-2"
            >
              Add your first address
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;