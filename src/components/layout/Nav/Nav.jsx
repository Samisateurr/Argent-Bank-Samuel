import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../../assets/images/argentBankLogo.png';
import Icon from '../../common/Icon/Icon';
import '../Nav/Nav.scss';
import { logout } from '../../../slices/userSlice'; // Assurez-vous d'importer logout depuis votre slice Redux

function Nav() {
  const isAuthenticated = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Code supplémentaire pour gérer la déconnexion si nécessaire
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="main-nav-item sign-out-button">
            Sign Out
          </button>
        ) : (
          <Link to="/sign-in" className="main-nav-item sign-in-button">
            <Icon name="user-circle" />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;