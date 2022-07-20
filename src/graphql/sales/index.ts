import { mutationType, nonNull, objectType, list, extendType, inputObjectType } from 'nexus'
import {EnvelopError} from '@graphql-yoga/node'
import { makeSales } from '../../services/sales'
import { ShoppingCartItem } from '../cart'

export const SalesItem = objectType({
  name: 'SalesItem',
  definition: (field) => {
    field.string('productSKU')
    field.string('productName')
    field.float('productPrice')
    field.nullable.float('discountRate')
    field.float('finalPrice')
    field.nullable.field('withPromo', {
      type: 'ProductPromoType'
    })
  }
})

export const Sales = objectType({
  name: 'Sales',
  definition: (field) => {
    field.list.field('salesItems', {
      type: SalesItem
    }),
      field.float('totalBill')
  }
})

export const ShoppingCartItemInput = inputObjectType({
  name: 'ShoppingCartItemInput',
  definition: (t) => {
    t.nonNull.string('productSKU')
  }
})

export const MakeSalesMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('makeSalesMutation', {
      type: Sales,
      args: {
        params: nonNull(list(nonNull(ShoppingCartItemInput))),
      },
      resolve: async (_, {params}, ctx) => {
        if (!params?.length) {
          throw new EnvelopError(`cartItems is required!`)
        }

        return makeSales(params)
      }
    })
  }
})