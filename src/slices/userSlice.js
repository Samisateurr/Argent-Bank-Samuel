import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosConfig';

export const loginAsync = (credentials) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/user/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    dispatch(login(response.data.token));
    return { success: true }; // Retourner un indicateur de succès
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    return { success: false, message: error.response?.data?.message || 'Authentication failed' };
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
      state.token = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
