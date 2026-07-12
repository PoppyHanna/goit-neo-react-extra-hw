import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      // const state = thunkAPI.getState();
      // const token = state.auth.token;    
      const token = thunkAPI.getState().auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue('No token')
      }; 

      setAuthHeader(token);                      

      const res = await axios.get('/contacts');  
      return res.data;                           
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data || e.message); 
    }
  }
);

export const addContact = createAsyncThunk('contacts/addContact', async (contact, thunkAPI) => {
  try {
    // const state = thunkAPI.getState();
    // const token = state.auth.token;
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token')
    };

    setAuthHeader(token);

    const res = await axios.post('/contacts', contact);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
  try {
    // const state = thunkAPI.getState();
    // setAuthHeader(state.auth.token);
    const token = thunkAPI.getState().auth.token;

    await axios.delete(`/contacts/${id}`);

    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});
