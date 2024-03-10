import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from "./Login"
import Blogs from "./Blogs"
import Home from "./Home"
import Account from "./Account"
import Planning from "./Planning"
import Header from "./Header"
import Footer from "./Footer"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header/>
    <Account/>
    <Footer/>
  </>
);
