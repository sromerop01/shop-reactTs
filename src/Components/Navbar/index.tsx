import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ShoppingCartContext } from "../../Context/context";
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { cartProducts, setSearchByCategory, signOut, setSignOut, account } = useContext(ShoppingCartContext)
    const location = useLocation();

    //SignOut
    const signOutLocalStorage = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOutLocalStorage ?? 'false')
    const isUserSignOut = signOut || parsedSignOut
    //Account
    const accountLocalStorage = localStorage.getItem('account')
    const parsedAccount = JSON.parse(accountLocalStorage || '{}')
    //Has an Account
    const noAccountInlocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInlocalState = account ? Object.keys(account).length === 0 : true
    const hasUserAnAccount = !noAccountInlocalStorage || !noAccountInlocalState


    const handleSignOut = () =>{
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        setSignOut(true)
    }

    useEffect(() => {
        const category = location.pathname.split('/').pop(); 
        if (category === "") {
            setSearchByCategory(null);  // Resetear si es la página principal
        } else {
            setSearchByCategory(category || "");  // Añadir fallback para cuando es undefined
        }
    }, [location.pathname, setSearchByCategory]);

    const activeStyle: string = 'underline underline-offset-4';

    const renderView = () =>{
        if (hasUserAnAccount && !isUserSignOut) {
            return(
                <>
                <li className='text-white/70'>sromerop2001@gmail.com</li>
                {[
                    { path: '/my-orders', label: 'My Orders' },
                    { path: '/my-account', label: 'My Account' },
                    { path: '/sign-in', label: 'Sign Out' },
                    ].map(({ path, label }) => (
                    <li key={path}>
                        <NavLink
                        to={path}
                        onClick={label === 'Sign Out' ? handleSignOut : undefined}
                        className={({ isActive }: { isActive: boolean }) =>
                            isActive ? activeStyle : undefined
                        }
                        >
                        {label}
                        </NavLink>
                    </li>
                ))}
            </>
            )
        } else {
            return (
                <li>
                    <NavLink
                        to='/sign-in'
                        className={({ isActive }: { isActive: boolean }) =>
                            isActive ? activeStyle : undefined}
                        onClick={() => handleSignOut()}
                    >
                        Sign in
                    </NavLink>
                </li>
            )
        }
    }

    return(
        <nav className='flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 shadow-md bg-sky-950 text-white'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                    Shop-react
                </NavLink>
                </li>
                {[
                    { path: '/', label: 'All' },
                    { path: '/clothes', label: 'Clothes' },
                    { path: '/electronics', label: 'Electronics' },
                    { path: '/furnitures', label: 'Furnitures' },
                    { path: '/toys', label: 'Toys' },
                    { path: '/others', label: 'Others' },
                ].map(({ path, label }) => (
                    <li key={path}>
                        <NavLink
                        to={path}
                        className={({ isActive }: { isActive: boolean }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <ul className='flex items-center gap-3'>
                {renderView()}
                <li className='flex items-center'>
                    <ShoppingCartIcon className='h-6 w-6 text-sky-700'></ShoppingCartIcon>
                    <div>{cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar