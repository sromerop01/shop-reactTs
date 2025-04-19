import { ReactNode, useState, useEffect, useCallback } from 'react';
import { Product, Order } from '../types/types';
import { ShoppingCardContext } from './context';
import { filteredItemsByTitle, filteredItemsByCategory } from '../Utils/utils';

interface Props {
  children: ReactNode;
}

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account')
  const signOutInLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountInLocalStorage){
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount ={}
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage)
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false))
    parsedSignOut = false
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage)
  }

};

export const ShoppingCardProvider = ({ children }: Props) => {
    // Inicializar localStorage

    //My account
    const [account, setAccount] = useState({
      name: '',
      email: '',
      password: ''
    })

    //Sign Out
    const [signOut, setSignOut] = useState(false)


    //Shopping Cart
    //Increment quality
    const [count, setCount] = useState(0);
    //Add products to cart
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    //Order
    const [order, setOrder] = useState<Order[]>([]);

    // Product Detail 
    // Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const toggleProductDetail = () => setIsProductDetailOpen(!isProductDetailOpen);
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
    const [isCheckoutSideMenu, setIsCheckoutSideMenu] = useState(false);
    const toggleCheckoutSideMenu = () => setIsCheckoutSideMenu(!isCheckoutSideMenu);

    //Get products
    const [items, setItems] = useState<Product[] | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          
          if (!response.ok){
            throw new Error("Error al obtener los datos.");
          }
          const data = await response.json();
          setItems(data);
        } catch (error) {
          setError(error as Error);
        }
      };
      fetchData();
    }, []);
    
    if (error){
      console.log(error);
    }

    //Get products by title
    const [searchByTitle, setSearchByTitle] = useState<string | null>(null);
    //Get products by Category
    const [searchByCategory, setSearchByCategory] = useState<string | null>(null);
    
    //Filtered by title and category
    const [filteredItems, setFilteredItems] = useState<Product[]>([]);

    // Define primero los tipos adecuados
    type SearchType = 'BY_TITLE' | 'BY_CATEGORY' | 'BY_TITLE_AND_CATEGORY' | undefined;

    // Usa useCallback para evitar redefinir la función en cada renderizado
    const filterBy = useCallback((
      searchType: SearchType, 
      items: Product[] | null, 
      searchByTitle: string | null, 
      searchByCategory: string | null
    ): Product[] => {
      if (!items) return [];
      
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle) || [];
      }

      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory) || [];
      }

      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        const filteredByCategory = filteredItemsByCategory(items, searchByCategory) || [];
        return searchByTitle 
          ? filteredByCategory.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
          : filteredByCategory;
      }

      return items;
    }, []);

    // Ahora corrige el useEffect
    useEffect(() => {
      if (!items) {
        setFilteredItems([]);
        return;
      }

      if (searchByTitle && searchByCategory) {
        setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory));
      } else if (searchByTitle) {
        setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
      } else if (searchByCategory) {
        setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory));
      } else {
        setFilteredItems(items);
      }
    }, [items, searchByTitle, searchByCategory, filterBy]);

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
            setSearchByCategory,
            account,
            setAccount,
            signOut,
            setSignOut
        }}>
            {children}
        </ShoppingCardContext.Provider>
    );
};