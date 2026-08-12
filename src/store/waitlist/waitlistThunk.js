import { createAsyncThunk } from "@reduxjs/toolkit";
import { waitingList } from "../../api/waitinglist.api";


export const fetchWaitingList = createAsyncThunk(
    'reservation/getWaitingList',
    async (_, thunkAPI) => {
        try {
            const data = await waitingList();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Waiting List Null",
            )
        }
    }
)