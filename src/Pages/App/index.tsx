import { BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context/shoppingCartProvider'
import { AppRoutes } from '../../Routes/AppRoutes'
import './App.css'

import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from "../../Components/CheckoutSideMenu"

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <BrowserRouter>
          <Navbar/>
          <AppRoutes/>
          <CheckoutSideMenu/>
        </BrowserRouter>
      </ShoppingCartProvider>
    </>
  )
}

export default App
