import { useContext, useState, useRef } from "react"
import { Link, Navigate } from "react-router-dom"
import { ShoppingCartContext } from "../../Context/context"
import Layout from "../../Components/Layout"


function SignIn() {
  const context = useContext(ShoppingCartContext)
  const {account, setAccount, setSignOut} = context
  const [view, setView] = useState('user-info')
  const form = useRef(null)

  //Account
  const accountLocalStorage = localStorage.getItem('account')
  const parsedAccount = JSON.parse(accountLocalStorage || '{}')
  //Has an Account
  const noAccountInlocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInlocalState = account ? Object.keys(account).length === 0 : true
  const hasUserAnAccount = !noAccountInlocalStorage || !noAccountInlocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    setSignOut(false)

    return <Navigate replace to={'/'}/>
  }

  const createAnAccount = () => {
    const formData = form.current ? new FormData(form.current) : new FormData()
    const data = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || '')
    }
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    setAccount(data)
    handleSignIn()
  }


  const renderLogin = () => {
    return(
      <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>{parsedAccount?.email}</span>
          </p>
          <p>
            <span className='font-light text-sm'>Password: </span>
            <span>{parsedAccount?.password}</span>
          </p>
          <Link
            to='/'>
              <button
                className=' bg-sky-950 text-white w-full rounded-lg py-3 mt-4 mb-2'
                onClick={() => handleSignIn()}
                disabled={!hasUserAnAccount}>
                Log in
              </button>
          </Link>
          <div className='text-center'>
            <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
          </div>
          <button
            className='border border-sky-950 rounded-lg mt-6 py-3'
            onClick={() => setView('create-user-info')}
            disabled={!hasUserAnAccount}>
              Sign Up
          </button>
        </div>
    )
  }

  const renderCreateUserInfo = () => {
    return(
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>Your name:</label>
          <input 
            type='text'
            id='name'
            name='name'
            defaultValue={parsedAccount?.name}
            placeholder='Santiago'
            className='rounded-lg border border-sky-950 placeholder:font-light placeholder:text-sm
                      placeholder:text-sky-950/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor='email' className='font-light text-sm'>Your email:</label>
          <input 
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='example@example.com'
            className='rounded-lg border border-sky-950 placeholder:font-light placeholder:text-sm
                      placeholder:text-sky-950/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor='password' className='font-light text-sm'>Your password:</label>
          <input 
            type='text'
            id='password'
            name='password'
            defaultValue={parsedAccount?.email}
            placeholder='************'
            className='rounded-lg border border-sky-950 placeholder:font-light placeholder:text-sm
                      placeholder:text-sky-950/60 focus:outline-none py-2 px-4'
          />
        </div>
        <Link to='/'>
          <button 
            className='bg-sky-950 text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}>
            create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogin()


  return (
    <>
      <Layout>
        <h1 className='font-medium text-2xl text-center mb-6 '>Welcome</h1>
        {renderView()}
      </Layout>
    </>
  )
}

export default SignIn
