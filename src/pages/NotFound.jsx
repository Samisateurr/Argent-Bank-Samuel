import React from 'react';
import Nav from '../components/layout/Nav/Nav';
import Footer from '../components/layout/Footer/Footer';
import './NotFound.scss';

function NotFound() {
  return (
    <>
      <Nav />
      <div className="not-found">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;