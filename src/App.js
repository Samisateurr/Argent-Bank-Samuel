import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync } from './slices/userSlice';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.loggedIn);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/user" /> : <SignIn />} />
        {isAuthenticated ? (
          <Route path="/user" element={<User />} />
        ) : (
          <Route path="/user" element={<Navigate to="/sign-in" replace />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
