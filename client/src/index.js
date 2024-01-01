import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Chat from "./views/Chat/Chat"
import SetAvatar from './views/SetAvatar/SetAvatar';
import Avatar from './views/Avatar/Avatar';
import ChatContainer from './component/ChatContainer/ChatContainer';
import ChatInput from './component/ChatInput/ChatInput';
import Contacts from './component/Contacts/Contacts';
import Welcome from './component/Welcome/Welcome';
import Logout from './component/Logout/Logout';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/',
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
  },
  {
    path: '/chatcontainer',
    element: <ChatContainer/>
  },
  {
    path: '/chatinput',
    element: <ChatInput/>
  },
  {
    path: '/contacts',
    element: <Contacts/>
  },
  {
    path: '/welcome',
    element: <Welcome/>
  }
])
root.render( <RouterProvider router={router} />) ;



