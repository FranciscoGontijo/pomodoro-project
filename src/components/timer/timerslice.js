// manage timer/ start/
import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name: "timer",
    initialState: {
        timer: {
            start: false
        }
    },
    reducers: {
        toggleStart: (state, action) => {
            state.timer.start = !state.timer.start
        }
    }
});

export const { toggleStart } = timerSlice.actions;
export const selectTimer = (state) => state.timer.timer;
export default timerSlice.reducer;