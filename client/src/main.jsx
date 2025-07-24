import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DashBoard from './DashBoard'
import SignUp from './SignUp'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/home-page",
    element:<DashBoard/>
  },
  {
    path:"signup",
    element:<SignUp/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
