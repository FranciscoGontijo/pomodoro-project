import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "../components/timersettings/settingsSlice";

export default configureStore({
    reducer: {
        settings: settingsReducer
    }
  });
  