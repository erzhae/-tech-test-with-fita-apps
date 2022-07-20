import { objectType, mutationField, nonNull, stringArg, enumType, arg, extendType } from 'nexus'
import { ProductPromoType } from '../promo'

export const UpdateCartAction = enumType({
  name: 'UpdateCartAction',
  members: ['ADD', 'REMOVE']
})

export const ShoppingCartItem = objectType({
  name: 'ShoppingCartItem',
  definition: (field) => {
    field.string('productSKU')
  }
})

export const UpdateCartItemMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.list.field('updateCartItems', {
      type: ShoppingCartItem,
      args: {
        action: nonNull(UpdateCartAction),
        productSKU: nonNull(stringArg())
      },
      resolve: async (_, { action, productSKU }, ctx) => {
        return [] // Resolver here
      }
    })
  }
})
