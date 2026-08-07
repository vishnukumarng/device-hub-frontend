import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./authThunk";

const initialState = {
  user: null,
  token: null,
  isAuthenticate: false,

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("auth_token");
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("auth_token", action.payload.token);
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
