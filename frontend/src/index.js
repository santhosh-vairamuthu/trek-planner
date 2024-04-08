
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line
import App from "./App"
import Login from "./components/Login"
import Blogs from "./components/Blogs"
import BlogData from "./components/BlogData"
import PlaceData from "./components/PlaceData"
import Home from "./components/Home"
import Suggestions from "./components/Suggestions"
import Account from "./components/Account"
import Planning from "./components/Planning"
// eslint-disable-next-line
import Header from "./components/Header"
import Footer from "./components/Footer"
import Error from "./components/Error"
import Test from "./components/Test"
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
  },
  {
    path : '/test',
    element : <><Test/><Footer/></>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);