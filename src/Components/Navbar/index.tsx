import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ShoppingCartContext } from "../../Context/context";
import { initializeLocalStorage } from '../../Utils/utils';
import ShoppingCart from '../ShoppingCart';

const Navbar = () => {
    const { setSearchByCategory, signOut, setSignOut, account } = useContext(ShoppingCartContext)
    const location = useLocation();

    const { parsedAccount, parsedSignOut } = initializeLocalStorage()
    const isUserSignOut = signOut || parsedSignOut

    const noAccountInLocalStorage = Object.keys(parsedAccount).length === 0
    const noAccountInLocalState = account ? Object.keys(account).length === 0 : true

    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

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
                <li className='text-white/70'>{parsedAccount?.email}</li>
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
                    <ShoppingCart />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar