import products from '../../data/products.json'
import { NexusGenObjects } from '../../models'

export const findProduct = (params: { sku: string }): NexusGenObjects['Product'] | null => {
  return products.find((product) => product.sku === params.sku) || null
}
