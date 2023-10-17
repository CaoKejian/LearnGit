import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../views/Home'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/home',
    element: <Home />
  }
]

export default routes;
