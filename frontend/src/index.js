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
import Error from "./Error"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path : '/',
    element : <><Header/><Home/><Footer/></>,
    errorElement : <Error/>
  },
  {
    path : '/blogs',
    element : <><Header/><Blogs/><Footer/></>
  },
  {
    path : '/auth',
    element : <Login/>
  },
  {
    path : '/account',
    element : <><Header/><Account/><Footer/></>
  }
  ,
  {
    path : '/plan',
    element : <><Header/><Planning/><Footer/></>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
