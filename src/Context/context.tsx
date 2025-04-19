import { createContext } from 'react';
import { ShoppingCardContextType } from '../types/types';

export const ShoppingCardContext = createContext<ShoppingCardContextType>({} as ShoppingCardContextType);