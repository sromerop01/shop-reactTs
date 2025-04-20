import { createContext } from 'react';
import { ShoppingCartContextType } from '../types/types';

export const ShoppingCartContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType);