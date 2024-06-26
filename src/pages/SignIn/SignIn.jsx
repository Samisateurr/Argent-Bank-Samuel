import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../../slices/userSlice';
import InputField from '../../components/common/InputField/InputField';
import Nav from '../../components/layout/Nav/Nav';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import '../SignIn/SignIn.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.loggedIn); // Utiliser isAuthenticated

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation des champs
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    const credentials = { email, password };
    try {
      const response = await dispatch(loginAsync(credentials));
      console.log('API Response:', response); // Log de la réponse de l'API
      setLoading(false);
      if (response.payload && response.payload.token) {
        navigate('/user'); // Redirection après une connexion réussie
      } else {
        setErrorMessage(response.payload ? response.payload.message : 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setLoading(false);
      setErrorMessage('Authentication failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user'); // Rediriger si déjà authentifié
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Sign In'}
            </Button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SignIn;
