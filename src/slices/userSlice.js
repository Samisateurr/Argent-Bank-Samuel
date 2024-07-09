import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosConfig';

// Définition de l'URL de base pour l'API
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Thunk asynchrone pour gérer la connexion de l'utilisateur
export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (credentials, { rejectWithValue }) => {
    try {
      // Envoi des informations d'identification pour se connecter
      const loginResponse = await axiosInstance.post(`${API_BASE_URL}/user/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Extraction du token de la réponse
      const token = loginResponse.data.body.token;

      // Stockage du token dans le localStorage
      localStorage.setItem('token', token);

      // Envoi d'une requête pour obtenir le profil de l'utilisateur
      const profileResponse = await axiosInstance.post(`${API_BASE_URL}/user/profile`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Stockage des informations utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(profileResponse.data.body));

      // Retourne le token et les informations utilisateur
      return { token, ...profileResponse.data.body };
    } catch (error) {
      // Gestion des erreurs
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  }
);

// Thunk asynchrone pour vérifier l'authentification de l'utilisateur
export const checkAuthAsync = createAsyncThunk(
  'user/checkAuthAsync',
  async (_, { rejectWithValue }) => {
    // Récupération du token et du flag "remember me" depuis le localStorage
    const token = localStorage.getItem('token');
    const rememberMe = localStorage.getItem('rememberMe');
    
    // Si le token ou le flag "remember me" est manquant, rejeter avec un message d'erreur
    if (!token || !rememberMe) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue({ message: 'No token found or remember me not selected' });
    }

    try {
      // Envoi d'une requête pour obtenir le profil de l'utilisateur
      const profileResponse = await axiosInstance.post(`${API_BASE_URL}/user/profile`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Retourne le token et les informations utilisateur
      return { token, ...profileResponse.data.body };
    } catch (error) {
      // En cas d'erreur, supprimer le token et les informations utilisateur du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue({ message: 'Invalid token' });
    }
  }
);

// Thunk asynchrone pour mettre à jour le nom d'utilisateur
export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async ({ userName }, { getState, rejectWithValue }) => {
    // Récupération du token depuis l'état global
    const { token } = getState().user;

    try {
      // Envoi d'une requête pour mettre à jour le nom d'utilisateur
      const response = await axiosInstance.put(`${API_BASE_URL}/user/profile`, { userName }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Mise à jour des informations utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(response.data.body));

      // Retourne les informations utilisateur mises à jour
      return response.data.body;
    } catch (error) {
      // Gestion des erreurs
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'Failed to update username' });
      }
    }
  }
);

// Création du slice utilisateur
const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    loggedIn: false,
    token: null,
    error: null,
    isLoading: true,
  },
  reducers: {
    // Action pour déconnecter l'utilisateur
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');  // Supprimer le flag "remember me" lors de la déconnexion
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion des états pour loginAsync
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload.token;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Failed to login';
        state.isLoading = false;
      })
      // Gestion des états pour checkAuthAsync
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload.token;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.userName = action.payload.userName;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Failed to authenticate';
        state.isLoading = false;
      })
      // Gestion des états pour updateUserName
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName; 
        state.lastName = action.payload.lastName;   
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Failed to update username';
      });
  },
});

// Exportation des actions et du reducer du slice utilisateur
export const { logout } = userSlice.actions;
export default userSlice.reducer;
