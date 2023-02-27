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
            console.log(action.payload);
            const index = state.labelList.findIndex(labelObj => labelObj.label === action.payload);
            console.log(index);
            const deletedLabel = state.labelList.splice(index, 1);
            console.log(deletedLabel);
        },
        fullfillLabelList: (state, action) => {
            state.labelList = action.payload;
        }
    }
});

export const { changeLabel, addLabel, deleteLabel, fullfillLabelList } = labelTagSlice.actions;
export const selectCurrentLabel = (state) => state.label.label;
export const selectLabelList = (state) => state.label.labelList;
export default labelTagSlice.reducer;