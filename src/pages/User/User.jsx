import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/layout/Nav/Nav';
import Footer from '../../components/layout/Footer/Footer';
import Account from '../../components/common/Account/Account';
import accountData from '../../helpers/accountData';
import Button from '../../components/common/Button/Button';
import '../User/User.scss';

const User = () => {
  const isAuthenticated = useSelector((state) => state.user.loggedIn);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est authentifié, sinon redirige vers la page de connexion
  if (!isAuthenticated) {
    navigate('/signin'); // Redirige vers la page de connexion
    return null; // Peut afficher un loader ou un message de chargement ici
  }

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <Button className="edit-button">Edit Name</Button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <div className="accounts-container">
          {accountData.map((account, index) => (
            <Account
              key={index}
              title={account.title}
              amount={account.amount}
              description={account.description}
              ButtonComponent={<Button className="transaction-button">View transactions</Button>}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default User;