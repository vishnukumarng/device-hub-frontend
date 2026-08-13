import { createAsyncThunk } from "@reduxjs/toolkit";
import { waitingList, joinWaitingList } from "../../api/waitinglist.api";


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

export const joinWaitingThunk = createAsyncThunk(
    'reservation/joinList',
    async (crendentials, thunkAPI) => {
        try {
            const data = await joinWaitingList(crendentials)
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Join Waitlist failed",
            );
        }
    }
)