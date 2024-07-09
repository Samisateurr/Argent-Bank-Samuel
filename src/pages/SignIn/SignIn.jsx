import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../../slices/userSlice';
import InputField from '../../components/common/InputField/InputField';
import Nav from '../../components/layout/Nav/Nav';
import Footer from '../../components/layout/Footer/Footer';
import Button from '../../components/common/Button/Button';
import '../SignIn/SignIn.scss';

const SignIn = () => {
  // Déclaration des états locaux pour les champs de saisie, les messages d'erreur et le chargement
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Utilisation des hooks pour la navigation et le dispatch des actions Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect pour récupérer les informations de connexion sauvegardées lors du premier rendu
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  // Gestionnaire de changement pour le champ email
  const handleEmailChange = (e) => setEmail(e.target.value);

  // Gestionnaire de changement pour le champ mot de passe
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Gestionnaire de changement pour la case à cocher "Remember me"
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  // Gestionnaire de soumission du formulaire
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

    // Dispatch de l'action loginAsync et attente du résultat
    const result = await dispatch(loginAsync(credentials));
    setLoading(false);

    // Si la connexion est réussie
    if (result.meta.requestStatus === 'fulfilled') {
      // Gestion de la sauvegarde des informations de connexion si "Remember me" est coché
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');
      }
      // Redirection vers la page utilisateur
      navigate('/user');
    } else {
      // Affichage du message d'erreur
      setErrorMessage(result.payload.message);
    }
  };

  // useEffect pour effacer le message d'erreur après 5 secondes
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Rendu du composant
  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1 className="sign-in-title">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
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
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button type="submit" width="100%" className="full-width" disabled={loading}>
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
