import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: null,
  },
  reducers: {
    getApiConfiguration(state, action) {
      state.url = action.payload;
    },
  },
});

export const homeSliceAction = homeSlice.actions;
export default homeSlice;
