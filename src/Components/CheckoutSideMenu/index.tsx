import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from "../../Context/context";
import OrderCard from '../OrderCard';
import { totalPrice } from '../../Utils/utils';
import { XMarkIcon } from '@heroicons/react/24/solid';


const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)
    const { isCheckoutSideMenu, toggleCheckoutSideMenu, cartProducts, setCartProducts, setOrder, order, setSearchByTitle } = context

    const handleDelete = (id: number) => {
        const filteredProduct = cartProducts.filter(product => product.id != id)
        setCartProducts(filteredProduct)
    }

    const handleCheckout = () =>{
        const orderToAdd = {
            date: '28.03.25',
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts)
        }

        setOrder([...order, orderToAdd])
        setCartProducts([])
        setSearchByTitle(null)
    }

    return(
        <aside 
        className={`${isCheckoutSideMenu ? 'flex' : 'hidden'} top-[68px] w-[360px] h-[calc(100vh-68px)] flex-col fixed right-0 border border-black rounded-lg bg-gray-100`}
        >
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl p-6'>My order</h2>
                <div>
                    <XMarkIcon 
                        className='h-6 w-6 m-6 text-black cursor-pointer'
                        onClick={() => toggleCheckoutSideMenu()}
                        />
                </div>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>
                {cartProducts.map((product) => (
                    <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <div className='px-6 mb-6'>
                <p className='flex justify-between items-center mb-2'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <button
                        className='bg-black text-white w-full py-3 cursor-pointer rounded'
                        onClick={
                            ()=> {handleCheckout(); toggleCheckoutSideMenu()}
                        }
                    >
                        Checkout
                    </button>
                </Link>
            </div>
        </aside>
    )
}

export default CheckoutSideMenu