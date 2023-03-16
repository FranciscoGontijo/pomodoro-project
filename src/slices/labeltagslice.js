import { createSlice } from "@reduxjs/toolkit";

export const labelTagSlice = createSlice({
    name: "label",
    initialState: {
        label: {
            label: 'SELECT LABEL',
            color: 'rgb(72, 4, 4)'
        },
        labelList: []
    },
    reducers: {
        changeLabel: (state, action) => {
            state.label = action.payload
        },
        addLabel: (state, action) => {
            state.labelList.push(action.payload);
        },
        deleteLabel: (state, action) => {
            const index = state.labelList.findIndex(labelObj => labelObj.label === action.payload);
            state.labelList.splice(index, 1);
        },
        fulfilLabelList: (state, action) => {
            state.labelList = action.payload;
        },
        resetLabelList: (state, action) => {
            state.labelList = []
            state.label = {
                label: 'SELECT LABEL',
                color: 'rgb(104, 85, 224)'
            }
        }
    }
});

export const { changeLabel, addLabel, deleteLabel, fulfilLabelList, resetLabelList } = labelTagSlice.actions;
export const selectCurrentLabel = (state) => state.label.label;
export const selectLabelList = (state) => state.label.labelList;
export default labelTagSlice.reducer;