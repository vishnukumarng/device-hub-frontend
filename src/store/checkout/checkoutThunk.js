import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  checkoutDevice,
  checkoutList,
  returndevice,
  reserveDevice,
  cancelReservation,
  claimReservation
} from "../../api/checkout.api";

export const fetchCheckouts = createAsyncThunk(
    'checkout/getCheckouts',
    async (_, thunkAPI) => {
        try {
            const data = await checkoutList();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Checkout List Null",
            )
        }
    }
)

export const returnDevice = createAsyncThunk(
    'checkout/returnDevice',
    async (checkoutId, { dispatch, rejectWithValue }) => {
        try {
            const res = await returndevice(checkoutId);
            dispatch(fetchCheckouts());
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const bookDevice = createAsyncThunk(
    'checkout/bookDevice',
    async (crendentials, thunkAPI) => {
        try {
            const data = await checkoutDevice(crendentials)
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed",
            );
        }
    }
)

export const reserveDeviceThunk = createAsyncThunk(
    'checkout/reserveDevice',
    async (credentials, thunkAPI) => {
        try {
            const data = await reserveDevice(credentials);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Reservation failed",
            );
        }
    }
)

export const cancelReservationThunk = createAsyncThunk(
    'checkout/cancelReservation',
    async (checkoutId, { dispatch, rejectWithValue }) => {
        try {
            const res = await cancelReservation(checkoutId);
            dispatch(fetchCheckouts());
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)

export const claimReservationThunk = createAsyncThunk(
    'checkout/claimReservation',
    async ({ checkoutId, expectedReturnTime }, { dispatch, rejectWithValue }) => {
        try {
            const res = await claimReservation(checkoutId, { expectedReturnTime });
            dispatch(fetchCheckouts());
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
)