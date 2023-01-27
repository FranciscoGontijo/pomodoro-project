import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 25,
        rounds: 2
    }
  },
  reducers: {
    changeSettings: (state, action) => {
        const { workTime, shortBreakTime, longBreakTime, rounds } = action.payload;
        state.settings = {
          workTime: workTime,
          shortBreakTime: shortBreakTime,
          longBreakTime: longBreakTime,
          rounds: rounds
        };
    }
  }
});

export const { changeSettings } = settingsSlice.actions;
export const selectSettings = (state) => state.settings; // maybe need to be state.settings.settings
export default settingsSlice.reducer;