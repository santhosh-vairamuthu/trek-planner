
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line
import App from "./App"
import Login from "./Login"
import Blogs from "./Blogs"
import BlogData from "./BlogData"
import PlaceData from "./PlaceData"
import Home from "./Home"
import Suggestions from "./Suggestions"
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
  },
  {
    path : '/blogdata',
    element : <><Header/><BlogData/><Footer/></>
  },
  {
    path : '/placedata',
    element : <><Header/><PlaceData/><Footer/></>
  },
  {
    path : '/explore',
    element : <><Header/><Suggestions/><Footer/></>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);