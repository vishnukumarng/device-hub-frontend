import { createSlice } from "@reduxjs/toolkit";
import { getdeviceThunk, getalldeviceThunk, getDeviceById } from "./deviceThunk";

const initialState = {
    devices: [],
    loading: false,
    error: null,

    device: null,        //  single device
    deviceLoading: false,
    deviceError: null,
}

const deviceSlice = createSlice({
    name: 'device',

    initialState,

    reducers: {
        clearError(state) {
            state.error = null;
        },
    },

    extraReducers: (builders) => {
        builders

            .addCase(getalldeviceThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getalldeviceThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.devices = action.payload.list
            })

            .addCase(getalldeviceThunk.rejected, (state, action) => {
                state.devices = null;

                state.error = action.payload
            })

            .addCase(getdeviceThunk.pending, (state) => {
                state.deviceLoading = true;
                state.deviceError = null;
            })

            .addCase(getdeviceThunk.fulfilled, (state, action) => {
                state.deviceLoading = false;
                state.device = action.payload.device ?? action.payload;
            })

            .addCase(getdeviceThunk.rejected, (state, action) => {
                state.deviceLoading = false;
            })

            .addCase(getDeviceById.pending, (state) => {
                state.deviceLoading = true;
                state.deviceError = null;
            })
            .addCase(getDeviceById.fulfilled, (state, action) => {
                state.deviceLoading = false;
                state.device = action.payload;
            })
            .addCase(getDeviceById.rejected, (state, action) => {
                state.deviceLoading = false;
                state.deviceError = action.payload;
            });
    }

})

export const { clearError } = deviceSlice.actions;

export default deviceSlice.reducer;