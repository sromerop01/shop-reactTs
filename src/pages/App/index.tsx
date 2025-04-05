import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCardProvider } from '../../Context'

import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import SignIn from '../SignIn'
import NotFound from '../NotFound'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from "../../Components/CheckoutSideMenu"

import './App.css'

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

const AppRoutes: React.FC = () => {
  const routes: React.ReactElement | null = useRoutes([
    { path: '/', element: <Home/> },
    { path: '/clothes', element: <Home/>},
    { path: '/electronics', element: <Home/>},
    { path: '/furnitures', element: <Home/>},
    { path: '/toys', element: <Home/>},
    { path: '/others', element: <Home/>},
    { path: '/my-account', element: <MyAccount/> },
    { path: '/my-order', element: <MyOrder/> },
    { path: '/my-orders/last', element: <MyOrder/> },
    { path: '/my-orders/:id', element: <MyOrder/> },
    { path: '/my-orders', element: <MyOrders/> },
    { path: '/sign-in', element: <SignIn/> },
    { path: '*', element: <NotFound/> },
  ]as RouteConfig[])

  return routes
}

function App() {
  

  return (
    <>
      <ShoppingCardProvider>
        <BrowserRouter>
          <Navbar/>
          <AppRoutes/>
          <CheckoutSideMenu/>
        </BrowserRouter>
      </ShoppingCardProvider>
    </>
  )
}

export default App
