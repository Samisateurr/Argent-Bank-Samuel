import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/argentBankLogo.png';
import Icon from '../../common/Icon/Icon';
import '../Nav/Nav.scss';

function Nav() {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/sign-in" className="main-nav-item">
          <Icon name="user-circle" />
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Nav;