import { useContext } from "react"
import { ShoppingCartContext } from "../../Context/context"
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ShoppingCart = () =>{
    const { toggleCheckoutSideMenu, toggleProductDetail, cartProducts } = useContext(ShoppingCartContext)

    const checkoutSideMenu = () => {
        toggleCheckoutSideMenu()
        toggleProductDetail()
    }

    return(
        <div className='relative flex gap-0.5 items-center' onClick={() => checkoutSideMenu()}>
            <ShoppingCartIcon className='h-6 w-6 fill-none text-sky-700 cursor-pointer'/>
            <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center
                rounded-full bg-sky-950 w-4 h-4 text-xs'>{cartProducts.length}</div>
        </div>
    )

}

export default ShoppingCart