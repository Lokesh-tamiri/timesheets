import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/Error/Error'
import Home from './pages/Home'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from 'react-hot-toast';
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <Provider store={store}>
      <Toaster position='top-center'/>
      <RouterProvider router={router} />
    </Provider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)
