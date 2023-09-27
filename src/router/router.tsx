import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../views/Home'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home'/>
  },
  {
    path: '/home',
    element: <Home />
  }
]

export default routes;
