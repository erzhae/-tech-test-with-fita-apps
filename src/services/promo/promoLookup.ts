import { NexusGenEnums, NexusGenObjects } from '../../models'
import promos from '../../data/products-promos.json'

export const promoLookup = (sku: string): NexusGenObjects['ProductPromo'] | null => {
  const promo = promos.find((promo) => {
    if (promo.productSKU === sku) {
      return {
        ...promo,
        type: promo.type as NexusGenEnums['ProductPromoType']
      }
    }
    return null
  })

  if (!promo) {
    return null
  }

  return {
    ...promo,
    type: promo.type as NexusGenEnums['ProductPromoType']
  }
}
