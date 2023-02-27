import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {
        workTime: 25,
        shortBreakTime: 5,
        longBreakTime: 25,
        rounds: 4,
        resetRound: 0,
        automatic: true
    }
  },
  reducers: {
    changeSettings: (state, action) => {
        const { workTime, shortBreakTime, longBreakTime, rounds, automatic } = action.payload;
        state.settings = {
          ...state.settings,
          workTime: +workTime,
          shortBreakTime: +shortBreakTime,
          longBreakTime: +longBreakTime,
          rounds: +rounds,
          automatic: automatic
        };
    },
    reduceRound: (state, action) => {
      state.settings.rounds--;
      state.settings.resetRound++;
    },
    resetRounds: (state, action) => {
      state.settings.rounds = state.settings.resetRound + 1;
      state.settings.resetRound = 0;
    }
  }
});

export const { changeSettings, reduceRound, resetRounds } = settingsSlice.actions;
export const selectSettings = (state) => state.settings.settings;
export default settingsSlice.reducer;