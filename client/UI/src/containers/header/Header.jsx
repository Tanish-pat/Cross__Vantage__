import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Launching Your Product Over the Oceans </h1>
      <p>Simplifying cross border regulatory requirements. Assisting Companies to expand their business in the international market. </p>

      <div className="gpt3__header-content__input">
      
        <button type="button">Get Demo</button>
        <button type="button">Get Started</button>

      </div>

      <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>


  </div>
);

export default Header;
