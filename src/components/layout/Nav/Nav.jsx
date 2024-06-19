import React from 'react';
import logo from '../../../assets/images/argentBankLogo.png';
import Icon from '../../common/Icon/Icon';
import '../Nav/Nav.scss'

function Nav() {
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="./index.html">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <a className="main-nav-item" href="./sign-in.html">
        <Icon name="user-circle" /> 
          Sign In
        </a>
      </div>
    </nav>
  );
}

export default Nav;