import React from 'react';
import Nav from '../../components/layout/Nav/Nav';
import Banner from '../../components/layout/Banner/Banner';
import Feature from '../../components/common/Feature/Feature';
import Footer from '../../components/layout/Footer/Footer';
import chatIcon from '../../assets/images/icon-chat.png';
import moneyIcon from '../../assets/images/icon-money.png';
import securityIcon from '../../assets/images/icon-security.png';
import '../../assets/styles/main.scss';

function Home() {
  const bannerSubtitles = [
    "No fees.",
    "No minimum deposit.",
    "High interest rates."
  ];

  return (
    <div className="Home">
      <Nav />
      <main>
        <Banner
          title="Promoted Content"
          subtitles={bannerSubtitles}
          text="Open a savings account with Argent Bank today!"
        />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Feature
            imgSrc={chatIcon}
            imgAlt="Chat Icon"
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <Feature
            imgSrc={moneyIcon}
            imgAlt="Money Icon"
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <Feature
            imgSrc={securityIcon}
            imgAlt="Security Icon"
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;