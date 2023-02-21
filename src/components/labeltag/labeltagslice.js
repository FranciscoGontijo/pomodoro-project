import { createSlice } from "@reduxjs/toolkit";

export const labelTagSlice = createSlice({
    name: "label",
    initialState: {
        label: {
            label: 'ADD LABEL',
            color: 'rgb(104, 85, 224)'
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
        },
        deleteLabel: (state, action) => {
            state.labelList.splice(action.payload, 1);
        }
    }
});

export const { changeLabel, addLabel, deleteLabel } = labelTagSlice.actions;
export const selectLabel = (state) => state.label.label;
export const selectLabelList = (state) => state.label.labelList;
export default labelTagSlice.reducer;