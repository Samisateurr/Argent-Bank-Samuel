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

      // Récupérer le profil utilisateur avec le token
      const profileResponse = await axiosInstance.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    firstName: '',
    lastName: '',
    loggedIn: false,
    token: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.name = '';
      state.firstName = '';
      state.lastName = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload.token;
        state.name = action.payload.userName || action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        console.log('Redux State after login:', state);
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Failed to login';
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
