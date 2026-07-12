import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  refreshUser,
} from "./operations";

import { toast } from "react-hot-toast";


const initialState = {
  user: {
    name: null,
    email: null,
  },

  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: builder => {

    builder

      .addCase(register.fulfilled, (state, action)=>{
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;

        toast.success("Registration successful");

      })


      .addCase(register.rejected,(state,action)=>{
        state.error = action.payload;

        toast.error(
          action.payload?.message || 
          "Registration failed"
        );

      })

      .addCase(login.fulfilled,(state,action)=>{
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;

        toast.success("Login successful");
      })

      .addCase(login.rejected,(state,action)=>{
        state.error = action.payload;

        toast.error(
          action.payload?.message ||
          "Login failed"
        );
      })

      .addCase(logout.fulfilled,state=>{
        state.user={
          name:null,
          email:null
        };
        state.token=null;
        state.isLoggedIn=false;
      })

      .addCase(refreshUser.pending,state=>{
        state.isRefreshing=true;
      })

      .addCase(refreshUser.fulfilled,(state,action)=>{
        state.user=action.payload;
        state.isLoggedIn=true;
        state.isRefreshing=false;
      })

      .addCase(refreshUser.rejected,(state,action)=>{
        state.isRefreshing=false;

        if(action.payload !== "No token"){
          state.token=null;
          state.user={
            name:null,
            email:null
          };
        }
      });
  }
});

export const authReducer = authSlice.reducer;

