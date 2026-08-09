import { createAsyncThunk } from "@reduxjs/toolkit";
import { getalldevice, getdevicebyqr, getdevicebyid } from "../../api/device.api";

export const getalldeviceThunk = createAsyncThunk(
    'device/fetchDevices',

    async (_, thunkAPI) => {
        try {
            const data = await getalldevice();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Device List Null",
            )
        }
    }
)

export const getdeviceThunk = createAsyncThunk(
    "device/getDevice",
    async (qrCode, { rejectWithValue }) => {
        try {
            const res = await getdevicebyqr(qrCode)
            return res;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Device not found for this QR code"
            );
        }
    }
);

export const getDeviceById = createAsyncThunk(
    'device/getById',
    async (id, { rejectWithValue }) => {
        try {
            const res = await getdevicebyid(id);
            return res;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Device not found"
            );
        }
    }
);

