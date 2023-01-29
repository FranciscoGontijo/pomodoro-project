import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 25,
        rounds: 4,
        resetRound: 0
    }
  },
  reducers: {
    changeSettings: (state, action) => {
        const { workTime, shortBreakTime, longBreakTime, rounds } = action.payload;
        state.settings = {
          ...state.settings,
          workTime: +workTime,
          shortBreakTime: +shortBreakTime,
          longBreakTime: +longBreakTime,
          rounds: +rounds
        };
    },
    reduceRound: (state, action) => {
      state.settings.rounds--;
      state.settings.resetRound++;
    },
    resetRound: (state, action) => {
      state.settings.rounds = state.settings.resetRound + 1;
      state.settings.resetRound = 0;
    }
  }
});

export const { changeSettings, reduceRound, resetRound } = settingsSlice.actions;
export const selectSettings = (state) => state.settings.settings;
export default settingsSlice.reducer;