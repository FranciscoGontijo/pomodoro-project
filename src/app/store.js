import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../components/timersettings/settingsslice";
import labelTagReducer from "../components/labeltag/labeltagslice";

export default configureStore({
    reducer: {
        settings: settingsReducer,
        label: labelTagReducer
    }
  });
  