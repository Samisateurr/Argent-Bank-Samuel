import React from 'react';
import '../Account/Account.scss';
import Button from '../../../components/common/Button/Button';

const Account = ({ title, amount, description }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Button className="transaction-button">View transactions</Button>
      </div>
    </section>
  );
};

export default Account;