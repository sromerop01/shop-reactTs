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
