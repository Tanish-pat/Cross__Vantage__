# 🚀 **Trade__Wise__**  
### _Launching Your Product Over the Ocean_

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) ![Build Status](https://img.shields.io/badge/Build-Stable-green.svg)  

---

## 📖 **Table of Contents**  
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Architecture](#architecture)
4. [Technology Stack](#technology-stack)  
5. [Installation and Setup](#installation-and-setup)  
6. [Usage Guide](#usage-guide)  
7. [Screenshots](#screenshots)  
8. [API Documentation](#api-documentation)  
9. [Future Improvements](#future-improvements)  
---

## 🌍 **Project Overview**  
TradeWise is a platform to simplify cross border regulations, current approaches involve going through a huge amount of web portals scavenging hundreds of PDFs to discover knowledge about regulations and grants.

TradeWise uses Large Language Models and web scrapers to simplify all the process. TradeWise further proposes standard Export Compiance Services(ECS) 1.0 to help ease out the construction and improvement of future solutions of the same nature.

---

## ✨ **Features**  

### 1. Large Language Models(LLMs)
- **LLM powered chatbot** interactive chatbot that can be prompted by the user. This makes TradeWise more accessible to non technical users.
- **Huge data summarising** The model takes all the data obtained by web scrapers with some basic preprocessing and embeds it into it's parameters to give the appropriate output to user prompts

### 2. Standard ECS 1.0
- **Standard to compliance solutions** This standard provides guidelines for designing, structuring, and integrating cross-border regulation and incentive data to facilitate their usability by GenAI tools, web crawlers, and web portals.

### 3. Web Builder
- **Easy adoption of standard** Biggest issue with our standard is the technical skills required to implement it. Our web builder tool ensures that it becomes much easier to make endpoints adhering to ECS 1.0

---

## ⚙️ **Technology Stack**   
- **LLM**: AWS Services(Bedrock, Lambda, S3 and API Gateway), Amazon OpenSearch Serverless, Titan Text Embeddings v2, Titan Text Premier 
- **Front end development**: React.js, Node.js, Vite
- **Backend development**: Express.js, MongoDB

---

## 🚀 **Installation and Setup**  

### Prerequisites  
- **Node.js and npm** installed 

### Steps to Install  
1. **Clone the Repository**  
   ```bash
   git clone git@github.com:Tanish-pat/Cross__Vantage__.git
   cd Cross__Vantage__

   ```

2. **Install Backend Dependencies**  
   ```bash
   cd server
   npm install
   ```

3. **Set up Frontend**  
   ```bash
   cd client/UI
   npm install
   npm run dev
   ```

---



## 🖼 **Preview**  
### 1. Landing Page
![Dashboard](./assets/dashboard.png)  

### 2. Chat UI
![Alerts](./assets/alerts.png)  

### 3. Website Builder 
![CargoChain App](mobile_app.png)  

### 4. Standardised RoDTEP - built by the website Builder


---

## 📑 **API Documentation**  
Here are the key API endpoints available for developers to further this solution:-

- **POST /api/register**: Signup on the website 
- **POST /api/login**: Login on the website
- **GET /api/protected**: Protected route on the website
- **GET /api/req?query={query}** : Send prompt to our LLM ( AWS Bedrock -  Knowledge Base )
- **GET /api/list** : Get list of all foundation models Available ( what we have access to ) in Bedrock
- **GET /api/healthCheck** : Get status of all the AWS service running ( when is the time out for AWS Lambda, how much of s3 storage we ahve exhausted )

---

## 🚀 **Future Improvements**  

1. **Add more country endpoints** for broader coverage.
2. **Strengthen the data pipeline** for diverse formats.
3. Integrate **current affairs and news sources** into RAG.
4. **Optimize AWS costs** using Spot Instances and audits.
5. **Improve UI** for better accessibility.
6. Add **flexible website builder** features.
7. Use **ML for data standardization**.
8. Ensure **data privacy** with global compliance.
9. Provide **advanced analytics** and insights.
10. Expand **localization** features.
11. **Scale infrastructure** with microservices.
12. Introduce **collaboration tools** for SMBs.
---

## 🤝 **Contributing**  
We welcome contributions to make Trade Wise better !  

1. **Fork the repository**  
2. **Create a new branch**  
   ```bash
   git checkout -b feature-branch-name
   ```
3. **Commit your changes**  
   ```bash
   git commit -m "Added new feature"
   ```
4. **Push to the branch**  
   ```bash
   git push origin feature-branch-name
   ```
5. **Open a pull request**

---

## 📜 **License**  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 **Contact Us**  
For queries or support, feel free to reach out at:  
- **Email**: Niranjan.gopal@iiitb.ac.in, tanish.pathania@iiitb.ac.in, siddharth.vikram@iiitb.ac.in
- **Linkedin**:[Siddharth Vikram](https://www.linkedin.com/in/siddharth-vikram-523835219/)
