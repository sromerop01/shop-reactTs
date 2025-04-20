import { useContext, useState, useRef } from "react"
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context/context"
import Layout from "../../Components/Layout"
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';

function MyAccount() {
  const { setAccount } = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const accountLocalStorage = localStorage.getItem('account')
    const parsedAccount = JSON.parse(accountLocalStorage || '{}')
    const form = useRef(null)

    const editAccount = () => {
      const formData = form.current ? new FormData(form.current) : new FormData()
      const data ={
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        password: String(formData.get('password') || '')
      }

      //Update account
      const stringifiedAccount = JSON.stringify(data)
      localStorage.setItem('account', stringifiedAccount)
      setAccount(data)

    }

    const renderUserInfo = () => {
      return (
        <div className='flex flex-col w-80'>
          <p>
            <span className='font-light text-sm'>Name: </span>
            <span>{parsedAccount?.name}</span>
          </p>
          <p>
            <span className='font-light text-sm'>Email: </span>
            <span>{parsedAccount?.email}</span>
          </p>
          <button
            className='border border-sky-950 rounded-lg mt-6 py-3'
            onClick={() => setView('edit-user-info')}>
            Edit
          </button>
        </div>
      )
    }

    const renderEditUserInfo = () => {
      return (
        <form ref={form} className='flex flex-col gap-4 w-80'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-light text-sm'>Your name:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={parsedAccount.name}
              placeholder="Peter"
              className='rounded-lg border border-sky-950 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='font-light text-sm'>Your email:</label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={parsedAccount.email}
              placeholder="hi@helloworld.com"
              className='rounded-lg border border-sky-950 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-light text-sm'>Your password:</label>
            <input
              type="text"
              id="password"
              name="password"
              defaultValue={parsedAccount.password}
              placeholder="******"
              className='rounded-lg border border-sky-950 placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
          </div>
          <button
            className='bg-sky-950 text-white w-full rounded-lg py-3'
            onClick={() => (setView('user-info'), editAccount())}>
            Edit
          </button>
        </form>
      )
    }

    const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <>
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-6 '>
          <Link to='/' className='absolute left-0'>
            <ChevronDoubleLeftIcon
              className="h-6 w-6 text-black cursor-pointer "
            />
          </Link>
          <h1 className='font-medium text-xl'>My account</h1>
        </div>
        {renderView()}
      </Layout>
    </>
  )
}

export default MyAccount
