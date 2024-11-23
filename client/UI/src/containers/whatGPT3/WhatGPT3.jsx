import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is TradeWise" text="TradeWise is a one stop solution to simplify cross border regulations and government incentives for sellers in E-commerce. TradeWise further proposes standard ECS 1.0 for any further solutions in the same domain, ECS 1.0 provides guidelines for endpoint, LLM and web crawler architecture." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>

    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Chatbots" text="We offer chatbots that send queries to our LLM for interactive assistance to users." />
      <Feature title="Standard ECS 1.0" text="Tradewises defines the standard Export Compliance Services(ECS) 1.0 which assists developers and bodies to align their solutions in a consistent manner." />
      <Feature title="Web Builder Tool" text="For higher accessibility, TradeWise provides endpoint constructing solution that eliminates the need to go through ECS 1.0." />
    </div>
  </div>
);

export default WhatGPT3;
