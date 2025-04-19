import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCardContext } from "../../Context/context";
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard';

function MyOrder() {
  const context = useContext(ShoppingCardContext)
  const { order } = context
  
  const currentPath = window.location.pathname
  let index: string | number = currentPath.substring(currentPath.lastIndexOf('/') + 1)

  if (index === "last") {
    index = (order?.length ?? 1) - 1
  } else {
    index = parseInt(index, 10)
  }

  const lastOrder = order?.[index]

  return (
    <>
      <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
          <Link to='/my-orders' className='absolute left-0'>
            <ChevronDoubleLeftIcon
              className="h-6 w-6 text-black cursor-pointer "
            />
          </Link>
          <h1>My Order</h1>
        </div>
        <div className='flex flex-col w-80'>
          {lastOrder?.products.map(product => (
            <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                
            />
          ))}
        </div>
        <div className="flex justify-between w-80 border-t-2 border-black font-normal mt-4 pt-2">
          <span className='text-lg'>Total:</span>
          <span className="text-lg font-bold">${lastOrder.totalPrice}</span>
        </div>
      </Layout>
    </>
  )
}

export default MyOrder
