import { objectType, enumType } from 'nexus'

export const ProductPromoType = enumType({
  name: 'ProductPromoType',
  members: ['FREE_PRODUCT', 'DISCOUNT'],
  description: 'Product Promotional Type'
})

export const ProductPromo = objectType({
  name: 'ProductPromo',
  definition: (field) => {
    field.field('type', { type: ProductPromoType }),
      field.string('productSKU'),
      field.int('minBuyQty'),
      field.nullable.float('discountRate'),
      field.nullable.string('freeProductSKU')
  }
})
