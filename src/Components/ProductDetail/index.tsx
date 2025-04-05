import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCardContext } from "../../Context";
import { useContext } from 'react';


const ProductDetail = () => {
    const context = useContext(ShoppingCardContext)
    const { isProductDetailOpen, toggleProductDetail, productToShow } = context;
    return(
        <aside 
        className={`${isProductDetailOpen ? 'flex' : 'hidden'} top-[68px] w-[360px] h-[calc(100vh-68px)] flex-col fixed right-0 border border-black rounded-lg bg-white shadow-md overflow-y-scroll`}
        >
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl p-6'>Detail</h2>
                <div>
                    <XMarkIcon 
                        className='h-6 w-6 m-6 text-black'
                        onClick={() => toggleProductDetail()}
                        />
                </div>
            
            </div>
            <figure className='px-6'>
                <img 
                className='w-full h-full rounded-lg' 
                src={productToShow.image} 
                alt={productToShow.title}
                />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl'>${productToShow.price}</span>
                <span className='font-medium text-lg'>{productToShow.title}</span>
                <span className='font-light text-sm'>{productToShow.description}</span>
            </p>
        </aside>
    )
}

export default ProductDetail