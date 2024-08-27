import { createSlice } from "@reduxjs/toolkit";
import { userLocal } from "../../services/localService";


const initialState = {
  infoUser: userLocal.get(), // Ensure the key matches the one in localStorage

};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    postLoginAction: (state, action) => {
      state.infoUser = action.payload;
      userLocal.set(action.payload); // Save to localStorage
    },
    postLogOutAction: (state) => {
      state.infoUser = null; // Set to null or empty object as per requirement
      userLocal.remove(); // Remove from localStorage
      
    },
    putInfoUserAction: (state, action) => {
      state.infoUser = action.payload;
      userLocal.set(action.payload);
     
       },
  },
});

export const { postLoginAction, postLogOutAction, putInfoUserAction } =
  userSlice.actions;

export default userSlice.reducer;
