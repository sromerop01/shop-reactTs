import { createContext } from 'react';
import { ShoppingCartContextType } from '../Types/types';

export const ShoppingCartContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType);