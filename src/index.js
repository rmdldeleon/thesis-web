import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Signup from './components/Signup';
import App from './components/mainpage';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <NotFound />
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/analytics',
    element: <App />,
  },
  {
    path: '/history',
    element: <App />,
  },
  {
    path: '/settings',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="285130620530-j2qb2bjdjac5jeftoch39c8lel9ps84i.apps.googleusercontent.com">
        <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
