import { Navigate, useRoutes } from "react-router-dom"
import { useContext } from "react"
import { ShoppingCartContext } from "../Context/context"
import { RouteConfig } from "../Types/types"

//Pages
import Home from '../Pages/Home'
import MyAccount from '../Pages/MyAccount'
import MyOrder from '../Pages/MyOrder'
import MyOrders from '../Pages/MyOrders'
import SignIn from '../Pages/SignIn'
import NotFound from '../Pages/NotFound'

  
const AppRoutes = () => {
    const { account, signOut } = useContext(ShoppingCartContext)
    
    //Account
    const accountLocalStorage = localStorage.getItem('account')
    const parsedAccount = JSON.parse(accountLocalStorage || '{}')
    // Sign Out
    const signOutLocalStorage = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOutLocalStorage ?? 'false')
    //Has an Account
    const noAccountInlocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInlocalState = Object.keys(account).length === 0
    const hasUserAnAccount = !noAccountInlocalStorage || !noAccountInlocalState
    const isUserSignOut = signOut || parsedSignOut
    
    
    return(
        useRoutes([
            { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/sign-in'}/> },
            { path: '/clothes',element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/sign-in'}/> },
            { path: '/electronics',element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/sign-in'}/> },
            { path: '/furnitures',element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/sign-in'}/> },
            { path: '/toys',element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/sign-in'}/> },
            { path: '/others',element: hasUserAnAccount && !isUserSignOut ? <Home/> : <Navigate replace to={'/sign-in'}/> },
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

export default AppRoutes