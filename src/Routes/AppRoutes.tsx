import { useRoutes } from "react-router-dom"
import { RouteConfig } from "../Types/types"

//Pages
import Home from '../Pages/Home'
import MyAccount from '../Pages/MyAccount'
import MyOrder from '../Pages/MyOrder'
import MyOrders from '../Pages/MyOrders'
import SignIn from '../Pages/SignIn'
import NotFound from '../Pages/NotFound'

  
export const AppRoutes: React.FC = () => {
    return(
        useRoutes([
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
    )
}