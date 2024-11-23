import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from "./App";
// import SignupForm from './pages/Signup/Signup';
import ChatBot from './pages/ChatBot/ChatBot';

const AppMain = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route path='/chat' element={<ChatBot />}/>
    </Routes>
    </>
  )
}

export default AppMain