import { createSlice } from "@reduxjs/toolkit";

export const labelTagSlice = createSlice({
    name: "label",
    initialState: {
        label: {
            label: 'ADD LABEL',
            color: 'purple'
        },
        labelList: []
    },
    reducers: {
        changeLabel: (state, action) => {
            state.label.label = action.payload.label;
            state.label.color = action.payload.color;
        },
        addLabel: (state, action) => {
            state.labelList.push(action.payload);
        }
    }
});

export const { changeLabel, addLabel } = labelTagSlice.actions;
export const selectLabel = (state) => state.label.label;
export const selectLabelList = (state) => state.label.labelList;
export default labelTagSlice.reducer;