import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Chat from "./views/Chat/Chat"
import SetAvatar from './views/SetAvatar/SetAvatar';
import Avatar from './views/Avatar/Avatar';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/chat',
    element: <Chat/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/setavatar',
    element: <SetAvatar/>
  },
  {
    path: '/avatar',
    element: <Avatar/>
  }
])
root.render( <RouterProvider router={router} />) ;



