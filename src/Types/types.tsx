// types.ts

import { Dispatch, SetStateAction } from 'react';

// Utilidad para no repetir Dispatch<SetStateAction<T>>
export type Setter<T> = Dispatch<SetStateAction<T>>;

// Interfaces para objetos base
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export type OrderCardProps = Omit<Product, 'description' | 'category'> & {
  handleDelete?: (id: number) => void;
};

export interface Order {
  date: string;
  products: Product[];
  totalProducts: number;
  totalPrice: number;
}

export interface Account {
  name: string;
  email: string;
  password: string;
  // Agrega más propiedades según lo que necesites guardar
}

// Interfaces para estados del contexto
export interface UIState {
  isProductDetailOpen: boolean;
  toggleProductDetail: () => void;
  isCheckoutSideMenu: boolean;
  toggleCheckoutSideMenu: () => void;
}

export interface CartState {
  cartProducts: Product[];
  setCartProducts: Setter<Product[]>;
  order: Order[];
  setOrder: Setter<Order[]>;
}

export interface ProductState {
  productToShow: Product;
  setProductToShow: Setter<Product>;
  items: Product[] | null;
  filteredItems: Product[];
  searchByTitle: string | null;
  setSearchByTitle: Setter<string | null>;
  searchByCategory: string | null;
  setSearchByCategory: Setter<string | null>;
}

//Interface para AppRoutes
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

// Estado principal del contexto de la app (Shopping Cart)
export interface ShoppingCartContextType extends UIState, CartState, ProductState {
  count: number;
  setCount: Setter<number>;
  account: Account;
  setAccount: Setter<Account>;
  signOut: boolean;
  setSignOut: Setter<boolean>;
}
