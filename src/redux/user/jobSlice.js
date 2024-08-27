import { createSlice } from '@reduxjs/toolkit'
import { jobLocal, userLocal } from '../../services/localService';

const initialState = {
  DetailJobs: [],
  listTypeJobs: [],
  listTypeJobsDetail: [],
  menuJobs: [],
  listJobs:jobLocal.get() , // Initialize listJobs correctly
}

const jobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    postListTypeJobsAction: (state, action) => {
      state.listTypeJobs = action.payload;
    },
    postListTypeJobsDetailAction: (state, action) => {
      state.listTypeJobsDetail = action.payload;
    },
    postMenujobsAction: (state, action) => {
      state.menuJobs = action.payload;
    },
    postListJobs: (state, action) => {
      state.listJobs = action.payload; 
      jobLocal.set(action.payload);
    },
  },
});

export const { postListTypeJobsAction, postListTypeJobsDetailAction, postMenujobsAction, postListJobs } = jobSlice.actions;

export default jobSlice.reducer;
