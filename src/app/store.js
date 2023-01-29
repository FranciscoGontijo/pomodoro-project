import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../components/timersettings/settingsslice";
import labelTagReducer from "../components/labeltag/labeltagslice";
import timerReducer from "../components/timer/timerslice";

export default configureStore({
    reducer: {
        settings: settingsReducer,
        label: labelTagReducer,
        timer: timerReducer
    }
  });
  