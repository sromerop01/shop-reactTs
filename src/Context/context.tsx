import { createContext } from 'react';
import { ShoppingCartContextType } from '../types/types';

export const ShoppingCardContext = createContext<ShoppingCartContextType>({} as ShoppingCartContextType);