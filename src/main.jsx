import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';

import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import AuthProvider from './Provider/AuthProvider';
import { Toaster } from 'react-hot-toast';

import HomePage from './Pages/Home/HomePage';
import Profile from './Pages/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute'
import GoalsAndRoutines from './Pages/GoalsAndRoutines/GoalsAndRoutines';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      
      {
        path: "/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: "/goalsAndRoutines",
        element: <PrivateRoute><GoalsAndRoutines></GoalsAndRoutines></PrivateRoute>,
      },
      
      { path: '/signin', element: <Signin /> },
      { path: '/signup', element: <Signup /> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
