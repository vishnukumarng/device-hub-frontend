import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../api/auth.api";

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (credentials, thunkAPI) => {
    try {
      const data = await login(credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);
