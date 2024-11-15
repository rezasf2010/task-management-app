import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../redux/taskSlice";

// Configure and create the Redux store
const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;
