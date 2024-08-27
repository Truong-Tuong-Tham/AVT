import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import jobSlice from './user/jobSlice';



export const store = configureStore({
  reducer: {
    // chứa toàn bộ state của ứng dụng
userReducer:userSlice,
jobReducer:jobSlice,
  },
});
