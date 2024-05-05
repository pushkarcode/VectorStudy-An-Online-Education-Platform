import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
