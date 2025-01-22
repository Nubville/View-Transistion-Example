import { configureStore } from "@reduxjs/toolkit";

import coffeesReducer from "../features/coffee/coffeesSlice";

export default configureStore({
  reducer: {
    coffees: coffeesReducer,
  },
});
