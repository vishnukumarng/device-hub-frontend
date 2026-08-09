import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, getdetails } from "../../api/auth.api";

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

export const restoreThunk = createAsyncThunk(
  "auth/restoreSession",

  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        return thunkAPI.rejectWithValue("NO_TOKEN");
      }

      const user = await getdetails();

      return {
        user,
        token,
      };
    } catch (error) {
      localStorage.removeItem("auth_token");

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Session expired"
      );
    }
  }
)
