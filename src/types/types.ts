import { Dispatch, SetStateAction } from 'react';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export type Order = {
    date: string,
    products: Product[],
    totalProducts: number,
    totalPrice: number
}

export type ShoppingCardContextType ={
    count: number,
    setCount: Dispatch<SetStateAction<number>>,
    isProductDetailOpen: boolean,
    toggleProductDetail: () => void,
    productToShow: Product;
    setProductToShow: Dispatch<SetStateAction<Product>>,
    cartProducts: Product[],
    setCartProducts: Dispatch<SetStateAction<Product[]>>,
    isCheckoutSideMenu: boolean,
    toggleCheckoutSideMenu: () => void,
    order: Order[],
    setOrder: Dispatch<SetStateAction<Order[]>>,
    items: Product[] | null,
    searchByTitle: string | null,
    setSearchByTitle: Dispatch<SetStateAction<string | null>>,
    filteredItems: Product[],
    searchByCategory: string | null,
    setSearchByCategory: Dispatch<SetStateAction<string | null>>
    
}