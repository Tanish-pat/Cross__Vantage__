import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Don\'t scour Government portals anymore',
    text: 'TradeWise exploit web scraping technologies to access data from web portals, so you don\'t have to.',
  },
  {
    title: 'Become active internationally',
    text: 'Our solution makes you aware of new licenses and patents that your products might require, we update data periodically every 24 hours.',
  },
  {
    title: 'Your cross border personal assistant',
    text: 'We offer a interactive chatbot, it directs output according to all the data recieved from the web scrapers.',
  },
  {
    title: 'Don\'t make websites from scratch anymore',
    text: 'TradeWise offers a web builder tool so that ECS 1.0 can be implemented with ease without much technical expertise required.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future of Cross Border Trading is Here. Adopt TradeWise & Let it Do The Work For You.</h1>
      <p>Checkout TradeWise on Github</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
