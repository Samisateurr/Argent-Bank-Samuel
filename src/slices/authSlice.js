import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Action asynchrone pour effectuer une authentification
export const loginAsync = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('https://api.example.com/login', credentials);
    dispatch(login(response.data)); // Appeler l'action login pour mettre à jour l'état
  } catch (error) {
    // Gérer les erreurs d'authentification ici
    console.error('Erreur lors de l\'authentification :', error);
    // Vous pouvez également dispatch une action pour gérer l'erreur dans le state Redux
  }
};

//Met à jour l'état, l'utilisateur est authentifié et stocke les données de l'utilisateur dans user.

//Réinitialise l'état pour indiquer que l'utilisateur n'est plus authentifié et réinitialise les données de l'utilisateur à null.

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;