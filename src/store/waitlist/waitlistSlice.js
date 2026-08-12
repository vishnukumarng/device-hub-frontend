import { createSlice } from "@reduxjs/toolkit";
import { fetchWaitingList } from "./waitlistThunk";

const initialState = {
    waitinglist: [],
    loading: false,
    error: null
}

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,

    reducers: {
        clearError(error) {
            state.error = null
        }
    },

    extraReducers: (builders) => {
        builders

            .addCase(fetchWaitingList.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchWaitingList.fulfilled, (state, action) => {
                state.loading = false
                state.waitinglist = action.payload.data
            })
            .addCase(fetchWaitingList.rejected, (state, action) => {
                state.waitinglist = null;
                state.error = action.payload
            })
    }
})

export const { clearError } = reservationSlice.actions;

export default reservationSlice.reducer;