import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userInfo: {},
  orders: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: action?.payload,
      };
    },

    saveAddress: (state, action) => {
      const addresses = [...(state?.userInfo?.addressList || [])];
      addresses.push(action?.payload);

      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          addressList: addresses,
        },
      };
    },

    updateAddress: (state, action) => {
      const updated = action.payload;

      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          addressList: state.userInfo?.addressList?.map((addr) =>
            addr.id === updated.id ? updated : addr,
          ),
        },
      };
    },

    removeAddress: (state, action) => {
      return {
        ...state,
        userInfo: {
          ...state?.userInfo,
          addressList: state?.userInfo?.addressList?.filter(
            (address) => address?.id !== action?.payload,
          ),
        },
      };
    },

    updateUserInfo: (state, action) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };
    },

    loadOrders: (state, action) => {
      return {
        ...state,
        orders: action?.payload,
      };
    },

    cancelOrder: (state, action) => {
      return {
        ...state,
        orders: state?.orders?.map((order) => {
          if (order?.id === action?.payload) {
            return {
              ...order,
              orderStatus: "CANCELLED",
            };
          }
          return order;
        }),
      };
    },
  },
});

export const {
  loadUserInfo,
  saveAddress,
  updateAddress,
  removeAddress,
  updateUserInfo,
  loadOrders,
  cancelOrder,
} = userSlice.actions;

export const selectUserInfo = (state) => state?.userState?.userInfo ?? {};
export const selectAllOrders = (state) => state?.userState?.orders ?? [];
export const selectIsUserAdmin = (state) =>
  state?.userState?.userInfo?.authorityList?.find(
    (authority) => authority?.roleCode === "ADMIN",
  )?.authority === "ADMIN";
export default userSlice?.reducer;
