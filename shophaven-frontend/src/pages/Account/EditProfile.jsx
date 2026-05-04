import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfileAPI } from "../../api/userInfo";
import { updateUserInfo } from "../../store/features/user";
import { setLoading } from "../../store/features/common";

const EditProfile = ({ userInfo, onCancel }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    phoneNumber: userInfo?.phoneNumber || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(setLoading(true));
    updateUserProfileAPI(form)
      .then((data) => {
        dispatch((data));
        onCancel();
      })
      .catch(() => {})
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-stone-900">Edit Profile</h1>
        <button
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800"
        >
          Cancel
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">

        {/* First Name */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-stone-400">
            First Name
          </label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-stone-400">
            Last Name
          </label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold tracking-widest uppercase text-stone-400">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 px-4 py-2 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-xs font-semibold text-white bg-stone-900 hover:bg-stone-700 px-4 py-2 rounded-full"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;