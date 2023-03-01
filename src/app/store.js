import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../slices/settingsslice";
import labelTagReducer from "../slices/labeltagslice";
import timerReducer from "../slices/timerslice";
import userReducer from "../slices/userSlice";
import statsReducer from "../slices/statsslice";

export default configureStore({
    reducer: {
        settings: settingsReducer,
        label: labelTagReducer,
        timer: timerReducer,
        user: userReducer,
        stats: statsReducer
    }
  });
  