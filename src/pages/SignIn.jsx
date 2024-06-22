import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/common/InputField/InputField';
import Nav from '../components/layout/Nav/Nav';
import Footer from '../components/layout/Footer/Footer';
import Button from '../components/common/Button/Button';
import '../pages/SignIn.scss';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    // After successful sign-in, redirect to User page
    navigate('/user');
  };

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button type="submit">Sign In</Button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;