import { Product } from '../Types/types';

export const initializeLocalStorage = () => {
  const accountLocalStorage = localStorage.getItem('account')
  const signOutLocalStorage = localStorage.getItem('sign-out')
  let parsedAccount
  let parsedSignOut

  if (!accountLocalStorage){
    localStorage.setItem('account', JSON.stringify({}))
    parsedAccount ={}
  } else {
    parsedAccount = JSON.parse(accountLocalStorage)
  }

  if (!signOutLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(true))
    parsedSignOut = true
  } else {
    parsedSignOut = JSON.parse(signOutLocalStorage)
  }

  return {parsedAccount, parsedSignOut}
}

export const filteredItemsByTitle = (items: Product[] | null, searchByTitle: string | null) => {
  if (!items || !searchByTitle) return items || [];
  return items.filter(item => item.title?.toLowerCase().includes(searchByTitle.toLowerCase()));
};

export const filteredItemsByCategory = (items: Product[] | null, searchByCategory: string | null) => {
  if (!searchByCategory || !items) return items || [];
  return items.filter(item => item.category?.toLowerCase().includes(searchByCategory.toLowerCase()));
};

/**
 * 
 * @param {Array} product cartProduct: Array of Objects 
 * @returns {number} Total price
 */
export const totalPrice = (products: { price: number }[]) => {
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}
