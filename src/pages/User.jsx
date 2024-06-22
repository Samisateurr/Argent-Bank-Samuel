import React from 'react';
import Nav from '../components/layout/Nav/Nav';
import Footer from '../components/layout/Footer/Footer';
import Account from '../components/common/Account/Account';
import accountData from '../../src/helpers/accountData';
import Button from '../components/common/Button/Button';
import '../pages/User.scss';

const User = () => {
  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />Tony Jarvis!</h1>
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