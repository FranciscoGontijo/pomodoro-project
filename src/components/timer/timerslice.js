// manage timer/ start/
import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name: "timer",
    initialState: {
        timer: {
            start: false,
            status: "ON_HOLD"
        }
    },
    reducers: {
        toggleStart: (state, action) => {
            state.timer.start = !state.timer.start;
        },
        changeStatus: (state, action) => {
            state.timer.status = action.payload;
        }
    }
});

export const { toggleStart, changeStatus } = timerSlice.actions;
export const selectTimer = (state) => state.timer.timer;
export default timerSlice.reducer;