import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSllice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {} = authSllice.actions;

export default authSllice.reducer;
