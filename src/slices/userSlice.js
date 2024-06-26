import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosConfig';

export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (credentials, { rejectWithValue }) => {
    try {
      const loginResponse = await axiosInstance.post('http://localhost:3001/api/v1/user/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const token = loginResponse.data.body.token;

      // Stocker le token dans le localStorage
      localStorage.setItem('token', token);

      // Récupérer le profil utilisateur avec le token
      const profileResponse = await axiosInstance.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Stocker les informations de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(profileResponse.data.body));

      return { token, ...profileResponse.data.body };
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuthAsync',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue({ message: 'No token found' });
    }

    try {
      const profileResponse = await axiosInstance.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return { token, ...profileResponse.data.body };
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue({ message: 'Invalid token' });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    loggedIn: false,
    token: null,
    error: null,
    isLoading: true, // Ajout de isLoading pour gérer l'état de chargement
  },
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
