import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/layout/Nav/Nav';
import Footer from '../../components/layout/Footer/Footer';
import Account from '../../components/common/Account/Account';
import accountData from '../../helpers/accountData';
import Button from '../../components/common/Button/Button';
import { updateUserName } from '../../slices/userSlice';
import '../User/User.scss';

const User = () => {
  const dispatch = useDispatch(); // Hook Redux pour dispatcher des actions
  const isAuthenticated = useSelector((state) => state.user.loggedIn); // Vérifie si l'utilisateur est connecté
  const firstName = useSelector((state) => state.user.firstName); // Récupère le prénom de l'utilisateur
  const lastName = useSelector((state) => state.user.lastName); // Récupère le nom de famille de l'utilisateur
  const userName = useSelector((state) => state.user.userName); // Récupère le nom d'utilisateur
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const [isEditing, setIsEditing] = useState(false); // État pour gérer l'édition des informations de l'utilisateur
  const [newUserName, setNewUserName] = useState(userName); // État pour le nouveau nom d'utilisateur

  // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    navigate('/sign-in'); 
    return null; 
  }

  // Fonction pour activer le mode édition
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Fonction pour sauvegarder les modifications du nom d'utilisateur
  const handleSaveClick = async () => {
    await dispatch(updateUserName({ userName: newUserName }));
    setIsEditing(false);
  };

  // Fonction pour annuler les modifications et revenir au mode non-édition
  const handleCancelClick = () => {
    setNewUserName(userName);
    setIsEditing(false);
  };

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          {isEditing ? (
            <div className="edit-name-form">
              <h2>Edit User Info</h2>
              <div className="form-group">
                <label htmlFor="userName">User name:</label>
                <input
                  type="text"
                  id="userName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  disabled
                />
              </div>
              <div className="form-buttons">
                <Button className="save-button" onClick={handleSaveClick}>Save</Button>
                <Button className="cancel-button" onClick={handleCancelClick}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Button className="edit-button" onClick={handleEditClick}>Edit Name</Button>
          )}
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
