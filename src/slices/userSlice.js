import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosConfig';

export const loginAsync = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('http://localhost:3001/api/v1/user/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    dispatch(login(response.data.token)); // Stocker le token dans l'état Redux
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    // Dispatch une action pour gérer l'erreur si nécessaire
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    loggedIn: false,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.token = action.payload; // Stocker le token dans l'état Redux
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;