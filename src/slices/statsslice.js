import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
    name: "stats",
    initialState: {
        dateStats: [],
        labelStats: []
    },
    reducers: {
        fulfilStats: (state, action) => {
            if (action.payload.dateStats.length > 0) {
                console.log(action.payload.dateStats);
                state.stats.dateStats = action.payload.dateStats;
            }
            if (action.payload.labelStats.length > 0) {
                console.log(action.payload.labelStats);
                state.stats.labelStats = action.payload.labelStats;
            }
        },
        resetStats: (state, action) => {
            state.stats = {
                dateStats: [],
                labelStats: []
            }
        }
    }
});

export const { fulfilStats, resetStats } = statsSlice.actions;
export const selectStats = (state) => state.stats.stats;
export default statsSlice.reducer;

//TypeError: Cannot set properties of undefined: I think it is because of the dates property with an empty array...
