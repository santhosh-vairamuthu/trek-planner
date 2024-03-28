
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
// eslint-disable-next-line
import Header from "./Header"
import Footer from "./Footer"
import Error from "./Error"
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path : '/',
    element : <><Home/><Footer/></>,
    errorElement : <Error/>
  },
  {
    path : '/blogs',
    element : <><Blogs/><Footer/></>
  },
  {
    path : '/auth',
    element : <Login/>
  },
  {
    path : '/account',
    element : <><Account/><Footer/></>
  }
  ,
  {
    path : '/plan',
    element : <><Planning/><Footer/></>
  },
  {
    path : '/blogdata',
    element : <><BlogData/><Footer/></>
  },
  {
    path : '/placedata',
    element : <><PlaceData/><Footer/></>
  },
  {
    path : '/explore',
    element : <><Suggestions/><Footer/></>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);