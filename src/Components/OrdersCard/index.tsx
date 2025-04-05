import { ChevronRightIcon } from '@heroicons/react/24/solid';

type OrdersCarProps = {
    totalPrice: number, 
    totalProducts: number
};

const OrdersCard: React.FC<OrdersCarProps> = ({ totalPrice, totalProducts }) => {
    return (
        <div className='flex justify-between items-center mb-3 p-4 shadow-md border-black'>
            <p className='space-x-20'>
                <span>28/03/25</span>
                <span>{totalProducts} articles</span>
                <span className='font-bold'>${totalPrice}</span>
            </p>
            <ChevronRightIcon className=' ml-2 h-6 w-6 text-black cursor-pointer'/>
        </div>
    );
};

export default OrdersCard;
