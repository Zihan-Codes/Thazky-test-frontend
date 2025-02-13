import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
    name: "appointments",
    initialState: {
        bookedAppointments: [],
    },
    reducers: {
        setAppointments: (state, action) => {
            state.bookedAppointments = action.payload;
        },
    },
});

export const { setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
