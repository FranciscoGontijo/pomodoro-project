import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
    name: "stats",
    initialState: {
        dateStats: [],
        labelStats: []
    },
    reducers: {
        fulfilDateStats: (state, action) => {
            if (action.payload.length > 0) {
                state.dateStats = action.payload;
            }
        },
        fulfilLabelStats: (state, action) => {
            if (action.payload.length > 0) {
                state.labelStats = action.payload;
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

export const { fulfilDateStats, fulfilLabelStats, resetStats } = statsSlice.actions;
export const selectDateStats = (state) => state.stats.dateStats;
export default statsSlice.reducer;

//TypeError: Cannot set properties of undefined: I think it is because of the dates property with an empty array...
