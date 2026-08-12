import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import deviceSlice from './device/deviceSlice'
import checkoutSlice from './checkout/checkoutSlice'
import reservationSlice from './waitlist/waitlistSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    device: deviceSlice,
    checkout: checkoutSlice,
    reservation: reservationSlice
  },
});
