import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../../slices/userSlice';
import InputField from '../../components/common/InputField/InputField';
import Nav from '../../components/layout/Nav/Nav';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import '../SignIn/SignIn.scss';

const SignIn = () => {
  const [email, setEmail] = useState(''); // Changer le nom de username à email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.loggedIn);

  const handleEmailChange = (e) => setEmail(e.target.value); // Changer le handleUsernameChange à handleEmailChange
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email, // Utiliser email au lieu de username
      password
    };
    await dispatch(loginAsync(credentials));
    if (isAuthenticated) {
      navigate('/user');
    } else {
      console.error('Authentication failed');
    }
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
              label="Email" // Changer le label de Username à Email
              type="email" // Changer le type de text à email
              id="email"
              value={email}
              onChange={handleEmailChange}
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