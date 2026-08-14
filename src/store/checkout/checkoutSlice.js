import { createSlice } from "@reduxjs/toolkit";
import {
  bookDevice,
  fetchCheckouts,
  returnDevice,
  reserveDeviceThunk,
  cancelReservationThunk,
  claimReservationThunk
} from "./checkoutThunk";

const initialState = {
    checkouts: [],
    loading: false,
    error: null,
    returning: false,
    booking: false,
    reserving: false,
    claiming: false
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,

    reducers: {
        clearError(state) {
            state.error = null
        }
    },

    extraReducers: (builders) => {
        builders

            .addCase(fetchCheckouts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCheckouts.fulfilled, (state, action) => {
                state.loading = false
                state.checkouts = action.payload.data
            })
            .addCase(fetchCheckouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(returnDevice.pending, (state) => {
                state.returning = true;
                state.error = null;
            })
            .addCase(returnDevice.fulfilled, (state) => {
                state.returning = false;
            })
            .addCase(returnDevice.rejected, (state, action) => {
                state.returning = false;
                state.error = action.payload;
            })

            .addCase(bookDevice.pending, (state) => {
                state.booking = true;
                state.error = null;
            })
            .addCase(bookDevice.fulfilled, (state) => {
                state.booking = false;
            })
            .addCase(bookDevice.rejected, (state, action) => {
                state.booking = false;
                state.error = action.payload;
            })

            .addCase(reserveDeviceThunk.pending, (state) => {
                state.reserving = true;
                state.error = null;
            })
            .addCase(reserveDeviceThunk.fulfilled, (state, action) => {
                state.reserving = false;
            })
            .addCase(reserveDeviceThunk.rejected, (state, action) => {
                state.reserving = false;
                state.error = action.payload;
            })

            .addCase(cancelReservationThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelReservationThunk.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(cancelReservationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(claimReservationThunk.pending, (state) => {
                state.claiming = true;
                state.error = null;
            })
            .addCase(claimReservationThunk.fulfilled, (state, action) => {
                state.claiming = false;
            })
            .addCase(claimReservationThunk.rejected, (state, action) => {
                state.claiming = false;
                state.error = action.payload;
            });
    }
})

export const { clearError } = checkoutSlice.actions;

export default checkoutSlice.reducer;