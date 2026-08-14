import { createSlice } from "@reduxjs/toolkit";
import { fetchWaitingList, joinWaitingThunk, leftWaitingList } from "./waitlistThunk";

const initialState = {
    waitinglist: [],
    loading: false,
    error: null,
    joining: false,
    leaving: false
}

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,

    reducers: {
        clearError(state) {
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

            .addCase(joinWaitingThunk.pending, (state) => {
                state.joining = true
                state.error = null
            })
            .addCase(joinWaitingThunk.fulfilled, (state, action) => {
                state.joining = false
            })
            .addCase(joinWaitingThunk.rejected, (state, action) => {
                state.joining = false;
                state.error = action.payload
            })

            .addCase(leftWaitingList.pending, (state) => {
                state.leaving = true
                state.error = null
            })
            .addCase(leftWaitingList.fulfilled, (state, action) => {
                state.leaving = false;
                state.waitinglist = state.waitinglist.filter(
                    (entry) => entry.id !== action.meta.arg
                );
            })
            .addCase(leftWaitingList.rejected, (state, action) => {
                state.leaving = false;
                state.error = action.payload
            })
    }
})

export const { clearError } = reservationSlice.actions;

export default reservationSlice.reducer;