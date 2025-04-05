import { useContext } from 'react'
import { ShoppingCardContext } from '../../Context'

import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'

function Home() {
  const context = useContext(ShoppingCardContext)
  const { setSearchByTitle, filteredItems } = context

  const renderView = () => {
    if (filteredItems?.length > 0) {
      return (
        filteredItems?.map(item => (
          <Card key={item.id} id={item.id} title={item.title} price={item.price} category={item.category} image={item.image} description={item.description} />
        ))
      )
    } else {
      return (
        <div>We don't have anything :(</div>
      )
    }
  }

  return (
    <>
      <Layout>
      <div className='flex items-center justify-center relative w-80 my-6'>
          <h1 className='font-medium text-xl'>Exclusive Products</h1>
      </div>
      <input 
          type='text' 
          placeholder='Search a product'
          className='rounded-lg border w-80 p-4 mb-4 focus:outline-none'
          onChange={(event) => setSearchByTitle(event.target.value)}
      />

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg justify-items-center '>
          {renderView()}
        </div>
      </Layout>
      <ProductDetail/>
    </>
  )
}

export default Home
