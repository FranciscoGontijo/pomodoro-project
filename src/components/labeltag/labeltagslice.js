import { createSlice } from "@reduxjs/toolkit";

export const labelTagSlice = createSlice({
    name: "label",
    initialState: {
        label: {
            label: 'ADD LABEL',
            color: 'black'
        }
    },
    reducers: {
        changeLabel: (state, action) => {
            state.label.label = action.payload.label;
            state.label.color = action.payload.color;
        }
    }
});

export const { changeLabel } = labelTagSlice.actions;
export const selectLabel = (state) => state.label.label;
export default labelTagSlice.reducer;