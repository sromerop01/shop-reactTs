import { ReactNode, createContext, useEffect, useState } from 'react';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

type Order = {
    date: string,
    products: Product[],
    totalProducts: number,
    totalPrice: number
}

type ShoppingCardContextType ={
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    isProductDetailOpen: boolean,
    toggleProductDetail: () => void,
    productToShow: Product;
    setProductToShow: React.Dispatch<React.SetStateAction<Product>>,
    cartProducts: Product[],
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    isCheckoutSideMenu: boolean,
    toggleCheckoutSideMenu: () => void,
    order: Order[],
    setOrder: React.Dispatch<React.SetStateAction<Order[]>>,
    items: Product[] | null,
    searchByTitle: string | null,
    setSearchByTitle: React.Dispatch<React.SetStateAction<string | null>>,
    filteredItems: Product[],
    searchByCategory: string | null,
    setSearchByCategory: React.Dispatch<React.SetStateAction<string | null>>
    
}



export const ShoppingCardContext = createContext<ShoppingCardContextType>()

export const ShoppingCardProvider = ({ children } : { children: ReactNode }) => {
    //Shopping Cart
    //Increment quality
    const [count, setCount] = useState(0)
    //Add products to cart
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    //Order
    const [order, setOrder] = useState<Order[]>([])


    // Product Detail 
    // Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const toggleProductDetail = () =>  setIsProductDetailOpen(!isProductDetailOpen)
    // Product DetailShow product
    const [productToShow, setProductToShow] = useState<Product>({
        id: 0,
        title: '',
        price: 0,
        category: '',
        image: '',
        description: ''
    });

    // Checkout Side Menu * Open/Close
    const [isCheckoutSideMenu, setIsCheckoutSideMenu] = useState(false)
    const toggleCheckoutSideMenu = () =>  setIsCheckoutSideMenu(!isCheckoutSideMenu)

    //Get products
    const [items, setItems] = useState<Product[] | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() =>{
      const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products')
          
          if (!response.ok){
            throw new Error ("Error al obtener los datos.")
          }
          const data = await response.json()
          setItems(data)
        } catch (error) {
          setError(error as Error)
        }
      }
      fetchData()
    }, [])
    if (error){
      console.log(error);
        
    }

    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState<string | null>(null)
    //Get products by Category
    const [searchByCategory, setSearchByCategory] = useState<string | null>(null)
    

    //Filtered by title
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);
    const filteredItemsByTitle = (items: Product[] | null, searchByTitle: string | null) => {
      return items.filter(item => item.title?.toLowerCase().includes(searchByTitle.toLowerCase()));
    };

    //Filtered by Category
    // const [filteredItems, setFilteredItems] = useState<Product[]>([]);
    const filteredItemsByCategory = (items: Product[] | null, searchByCategory: string | null) => {
      if (!searchByCategory || !items) return items || [];
      return items.filter(item => item.category?.toLowerCase().includes(searchByCategory.toLowerCase()));
    };

    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
      }
  
      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
      }
  
      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
  
      if (!searchType) {
        return items
      }
    }

    useEffect(() => {
      if (!items) return;
    
      if (searchByTitle && searchByCategory) {
        setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));
      } else if (searchByTitle) {
        setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
      } else if (searchByCategory) {
        setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
      } else {
        setFilteredItems(items);
      }
    }, [items, searchByTitle, searchByCategory]);

    return(
        <ShoppingCardContext.Provider value={{
            count,
            setCount,
            isProductDetailOpen,
            toggleProductDetail,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenu,
            toggleCheckoutSideMenu,
            order,
            setOrder,
            items,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory

        }}>
            {children}
        </ShoppingCardContext.Provider>
    )
}