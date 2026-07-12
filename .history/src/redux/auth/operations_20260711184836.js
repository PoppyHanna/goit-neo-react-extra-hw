// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://connections-api.goit.global';

// const setAuthHeader = token => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   delete axios.defaults.headers.common.Authorization;
// };

// export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
//   try {
//     const res = await axios.post('/users/signup', credentials);
//     setAuthHeader(res.data.token);
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || error.message);
//   }
// });

// export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
//   try {
//     const res = await axios.post('/users/login', credentials);
//     setAuthHeader(res.data.token);
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || error.message);
//   }
// });

// export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   try {
//     await axios.post('/users/logout');
//     clearAuthHeader();
//     return true;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response?.data || error.message);
//   }
// });

// export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
//   const state = thunkAPI.getState();
//   const persistedToken = state.auth.token;

//   if (!persistedToken) return thunkAPI.rejectWithValue('No token');

  
//   try {
//     setAuthHeader(persistedToken);
//     const res = await axios.get('/users/current');
//     return res.data;
//   } catch (error) {
//     clearAuthHeader();
//     return thunkAPI.rejectWithValue(error.response?.data || error.message);
//   }
// });



import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";


const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};


const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};


export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "/users/signup",
        credentials
      );

      setAuthHeader(response.data.token);

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);



export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {

      const response = await axios.post(
        "/users/login",
        credentials
      );

      setAuthHeader(response.data.token);

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);



export const logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {

    try {

      await axios.post("/users/logout");

      clearAuthHeader();

      return true;

    } catch(error){

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);



export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {

    const token = thunkAPI.getState().auth.token;


    if (!token) {
      return thunkAPI.rejectWithValue("No token");
    }


    try {

      setAuthHeader(token);

      const response = await axios.get(
        "/users/current"
      );


      return response.data;


    } catch(error){

      clearAuthHeader();

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

