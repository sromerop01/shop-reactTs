import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShoppingCartContext } from "../../Context/context"
import Layout from "../../Components/Layout"


function SignIn() {
  const context = useContext(ShoppingCartContext)
  const {account} = context

  //Account
  const accountSingIN = localStorage.getItem('account')
  const parsedAccount = JSON.parse(accountSingIN)
  //Has an Account
  const noAccountInlocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInlocalState = account ? Object.keys(account).length === 0 : true
  const hasUserAnAccount = !noAccountInlocalStorage || !noAccountInlocalState

  return (
    <>
      <Layout>
      <h1 className='font-medium text-2xl text-center mb-6 '>Welcome</h1>
        <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>sromerop2001@gmail.com</span>
          </p>
          <p>
            <span className='font-light text-sm'>Password: </span>
            <span>**********</span>
          </p>
          <Link
            to='/'>
              <button
                className=' bg-sky-950 text-white w-full rounded-lg py-3 mt-4 mb-2'>
                Log in
              </button>
          </Link>
          <div className='text-center'>
            <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
          </div>
          <button
            className='border border-sky-950 rounded-lg mt-6 py-3'>
              Sign Up
          </button>
        </div>
      </Layout>
    </>
  )
}

export default SignIn
