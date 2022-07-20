import { NexusGenObjects } from '../../models'

export const checkIsPromoClaimable = (
  processedCartItems: NexusGenObjects['SalesItem'][],
  promo: NexusGenObjects['ProductPromo']
): boolean => {
  const { minBuyQty, productSKU, type } = promo
  if (!type || !productSKU || !minBuyQty) {
    return false
  }

  const processedProductWithPromo = processedCartItems.filter((item) => item.productSKU === productSKU)
  if (processedProductWithPromo.length < minBuyQty) {
    return false
  }

  if (type === 'FREE_PRODUCT') {
    const freeProductIsClaimed = processedCartItems.find((item) => item.withPromo === 'FREE_PRODUCT')
    if (freeProductIsClaimed) {
      return false
    }
  }

  return true
}
