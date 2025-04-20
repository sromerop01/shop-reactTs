import React from "react";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context/context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Product } from "../../types/types";

const Card: React.FC<Product> = ({id, title, price, category, image, description }) => {
  const context = useContext(ShoppingCartContext)
  const { count, setCount, toggleProductDetail,isProductDetailOpen, setProductToShow, cartProducts, setCartProducts, toggleCheckoutSideMenu,isCheckoutSideMenu} = context

  const showProduct = (ProductDetail: Product) => {
    if (isCheckoutSideMenu){
      toggleCheckoutSideMenu()
    }
    toggleProductDetail()
    setProductToShow(ProductDetail)
  }

  const addProductsToCar = (event: React.MouseEvent<Element>, productData: Product) =>{
    event.stopPropagation()
    setCount(count + 1)
    setCartProducts([...cartProducts, productData])
    if (isProductDetailOpen){
      toggleProductDetail()
    }
    if (!isCheckoutSideMenu) {
      toggleCheckoutSideMenu()
    }
    
  }

  const renderIcon = (id: number) => {
    const isInCart = cartProducts.filter((product: Product) => product.id === id).length > 0
    if (isInCart) {
      return(
        <div 
            className="absolute top-0 right-0 flex justify-center items-center bg-sky-950 w-6 h-6 rounded-full m-2 p-1 text-black font-bold"
          >
          <CheckIcon 
            className='h-6 w-6 text-white cursor-pointer'
          />
        </div>
      ) 
    } else {
      return(
        <div 
            className="absolute top-0 right-0 flex justify-center items-center bg-sky-600/50 w-6 h-6 rounded-full m-2 p-1 text-white font-bold"
          >
          <PlusIcon 
            className='h-6 w-6 text-black cursor-pointer'
            onClick={(event) => {addProductsToCar(event, { id, title, price, category: category, image, description })}}
          />
        </div>
      )
    }
  }

  return (
    <div 
      className="bg-orange-600/60 cursor-pointer w-56 h-60 rounded-lg shadow-md"
      onClick={() => showProduct({ id, title, price, category: category, image, description })}
      >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-orange-500/80 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={image}
          alt={title}
        />
        {renderIcon(id)}
      </figure>
      <p className="flex justify-between px-2 overflow-hidden">
        <span className="text-xs font-light truncate w-4/5">{title}</span>
        <span className="text-lg font-medium">${price}</span>
      </p>
    </div>
  );
};

export default Card;