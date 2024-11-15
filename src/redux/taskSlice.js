import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://46.100.46.149:8069";

// Initial state of the task slice, including loading status, tasks array, and error message
const initialState = {
  loading: false,
  tasks: { results: [] },
  error: "",
};

// Async thunk to fetch all tasks from the API
export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  return axios.get(`${API_URL}/api/tasks`).then((res) => res.data);
});

// Async thunk to delete a specific task from the API
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId) => {
    await axios.delete(`${API_URL}/api/tasks/${taskId}`);
    return taskId;
  }
);

// Async thunk to create a new task and save it to the API
export const createTask = createAsyncThunk(
  "task/createTask",
  async (newTask) => {
    const taskToSave = { ...newTask, completed: false };

    const response = await axios.post(
      `${API_URL}/api/tasks/?format=json`,
      taskToSave
    );
    return response.data;
  }
);

// Async thunk to update an existing task in the API
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (updatedTask) => {
    const { id, title, description, completed } = updatedTask;
    const response = await axios.put(`${API_URL}/api/tasks/${id}`, {
      title,
      description,
      completed,
    });
    return response.data;
  }
);

// Async thunk to toggle the completion status of a task in the API
export const toggleTaskCompletion = createAsyncThunk(
  "task/toggleTaskCompletion",
  async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    const response = await axios.put(
      `${API_URL}/api/tasks/${task.id}`,
      updatedTask
    );
    return response.data;
  }
);

// Creating the task slice, which includes actions and reducers
const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers: (builder) => {
    //fetchTasks reducers
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = [];
      state.error = action.error.message;
    });
    //deleteTask reducers
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks.results = state.tasks.results.filter(
        (task) => task.id !== action.payload
      );
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.error.message;
    });
    //createTasks reducers
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.results.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.error.message;
    });
    //updateTasks reducers
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.results.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks.results[index] = action.payload;
      }
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.error = action.error.message;
    });
    //toggleTaskCompletion Tasks reducers
    builder.addCase(toggleTaskCompletion.fulfilled, (state, action) => {
      const index = state.tasks.results.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks.results[index] = action.payload;
      }
    });
    builder.addCase(toggleTaskCompletion.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default taskSlice.reducer;
