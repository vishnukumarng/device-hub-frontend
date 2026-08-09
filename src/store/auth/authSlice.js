import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, restoreThunk } from "./authThunk";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,

  loading: false,
  initializing: true,
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
        state.user = {
          name: action.payload.name,
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("auth_token", action.payload.token);
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Something went wrong";
      })

      .addCase(restoreThunk.pending, (state) => {
        state.initializing = true;
        state.error = null;
      })

      .addCase(restoreThunk.fulfilled, (state, action) => {
        state.initializing = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(restoreThunk.rejected, (state, action) => {
        state.initializing = false;

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;

        if (action.payload !== "NO_TOKEN") {
          state.error =
            action.payload || "Session expired";
        }
      });


  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
