import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./Login"
import Home from "./Home"
import Header from "./Header"
import Footer from "./Footer"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header/>
    <Home/>
    <Footer/>
  </>
);
