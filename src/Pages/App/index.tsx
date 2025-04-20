import { BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context/shoppingCartProvider'
import { initializeLocalStorage } from '../../Utils/utils'
import AppRoutes from '../../Routes/AppRoutes'
import './App.css'

import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from "../../Components/CheckoutSideMenu"

function App() {
  // Inicializar localStorage
  initializeLocalStorage()

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
