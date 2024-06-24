import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.user.loggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
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