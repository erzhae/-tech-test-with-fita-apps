import 'mocha'
import { expect } from 'chai'

import { makeSales } from '../makeSales'

describe(`makeSales`, () => {
  it('makeSales 1 Macbook get 1 Raspberry', () => {
    const sales = makeSales([{ productSKU: '43N23P' }])

    expect(sales.totalBill).to.equal(5399.99)
    expect(sales.salesItems).deep.equal([
      {
        productSKU: '43N23P',
        productName: 'Macbook Pro',
        productPrice: 5399.99,
        finalPrice: 5399.99
      },
      {
        productSKU: '234234',
        productName: 'Raspberry Pi B',
        productPrice: 30,
        finalPrice: 0,
        withPromo: 'FREE_PRODUCT'
      }
    ])
  })

  it('checkout 2 Google Home Get 1 Free', () => {
    const sales = makeSales([{ productSKU: '120P90' }, { productSKU: '120P90' }])

    expect(sales.totalBill).to.equal(99.98)
    expect(sales.salesItems).deep.equal([
      {
        productSKU: '120P90',
        productName: 'Google Home',
        productPrice: 49.99,
        finalPrice: 49.99
      },
      {
        productSKU: '120P90',
        productName: 'Google Home',
        productPrice: 49.99,
        finalPrice: 49.99
      },
      {
        productSKU: '120P90',
        productName: 'Google Home',
        productPrice: 49.99,
        finalPrice: 0,
        withPromo: 'FREE_PRODUCT'
      }
    ])
  })

  it('checkout 3 Alexa Get 10% Discount', () => {
    const sales = makeSales([{ productSKU: 'A304SD' }, { productSKU: 'A304SD' }, { productSKU: 'A304SD' }])

    expect(sales.totalBill).to.equal(295.65)
    expect(sales.salesItems).deep.equal([
      {
        productSKU: 'A304SD',
        productName: 'Alexa Speaker',
        productPrice: 109.5,
        finalPrice: 98.55,
        discountRate: 0.1,
        withPromo: 'DISCOUNT'
      },
      {
        productSKU: 'A304SD',
        productName: 'Alexa Speaker',
        productPrice: 109.5,
        finalPrice: 98.55,
        discountRate: 0.1,
        withPromo: 'DISCOUNT'
      },
      {
        productSKU: 'A304SD',
        productName: 'Alexa Speaker',
        productPrice: 109.5,
        finalPrice: 98.55,
        discountRate: 0.1,
        withPromo: 'DISCOUNT'
      }
    ])
  })
})
