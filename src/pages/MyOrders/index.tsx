import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCardContext } from '../../Context';
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid';
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"

function MyOrders() {
  const context = useContext(ShoppingCardContext)
  const { order } = context

  return (
    <>
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-6 '>
          <Link to='/' className='absolute left-0'>
            <ChevronDoubleLeftIcon
              className="h-6 w-6 text-black cursor-pointer "
            />
          </Link>
          <h1 className='font-medium text-xl'>My Orders</h1>
        </div>
        {
            order.map((order, index) => (
                <Link key={index} to={`/my-orders/${index}`}>
                    <OrdersCard
                        totalPrice={order.totalPrice}
                        totalProducts={order.totalProducts}
                    />
                </Link>
            ))
        }
      </Layout>
    </>
  )
}

export default MyOrders
