import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Chat from "./views/Chat/Chat"

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/Chat',
    element: <Chat/>
  },

  {
    path: '/register',
    element: <Register/>
  }
])
root.render( <RouterProvider router={router} />) ;



