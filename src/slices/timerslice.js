// manage timer/ start/
import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
    name: "timer",
    initialState: {
        timer: {
            start: false,
            status: "ON_HOLD",
            title: 'focus'
        }
    },
    reducers: {
        toggleStart: (state, action) => {
            state.timer.start = !state.timer.start;
        },
        changeStatus: (state, action) => {
            state.timer.status = action.payload;
        },
        changeTimer: (state, action) => {
            state.timer.title = action.payload;
        }
    }
});

export const { toggleStart, changeStatus, changeTimer } = timerSlice.actions;
export const selectTimer = (state) => state.timer.timer;
export default timerSlice.reducer;