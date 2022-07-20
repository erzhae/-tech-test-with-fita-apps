import { objectType } from 'nexus'

export const Product = objectType({
  name: 'Product',
  definition(field) {
    field.id('sku'), field.string('name'), field.float('price'), field.int('stock')
  }
})
