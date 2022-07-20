import { NexusGenInputs, NexusGenObjects } from './../../models'
import { promoLookup } from '../promo/promoLookup'
import { checkIsPromoClaimable } from '../promo'
import { findProduct } from '../product'

export const makeSales = (cartItems: NexusGenInputs['ShoppingCartItemInput'][]): NexusGenObjects['Sales'] => {
  let totalBill: number = 0
  const salesItems: NexusGenObjects['SalesItem'][] = []

  for (const item of cartItems) {
    const { productSKU } = item
    if (!productSKU) continue

    const product = findProduct({ sku: productSKU })
    if (!product) continue

    const { sku, name, price } = product
    if (!sku || !name || !price) continue

    salesItems.push({
      productSKU: sku,
      productName: name,
      productPrice: price,
      finalPrice: price
    })

    const productPromo = promoLookup(productSKU)
    if (!productPromo) continue
    console.info('promo', productPromo)

    const isPromoClaimable = checkIsPromoClaimable(salesItems, productPromo)
    if (!isPromoClaimable) continue
    console.info('isPromoClaimable', isPromoClaimable)

    const { type, discountRate, freeProductSKU } = productPromo
    if (!type) continue

    switch (type) {
      case 'FREE_PRODUCT':
        if (!freeProductSKU) continue

        const freeProduct = findProduct({ sku: freeProductSKU })
        console.info(`freeProduct`, freeProduct)
        salesItems.push({
          productSKU: freeProduct?.sku,
          productName: freeProduct?.name,
          productPrice: freeProduct?.price,
          finalPrice: 0,
          withPromo: type
        })
        break
      case 'DISCOUNT':
        if (!discountRate) continue
        salesItems.forEach((item) => {
          if (item.productSKU && item.productPrice) {
            if (item.productSKU === productSKU) {
              item.discountRate = discountRate
              item.finalPrice = item.productPrice - item.productPrice * discountRate
              item.withPromo = type
            }
          }
        })
        break
      default:
        continue
    }
  }

  salesItems.forEach(({ finalPrice }) => {
    if (finalPrice) {
      totalBill += finalPrice
    }
  })

  return {
    salesItems,
    totalBill
  }
}
