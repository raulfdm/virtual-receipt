const Product = require('../js/product')

/*afterEach(() => {
  product = new Product()
})
*/
describe('Wrong types - ARGUMENTS', () => {
  let product = new Product()
  // Wrong Types
  describe('Wrong types', () => {

    test('throw on pass invalid type for Quantity (NaN)', () => {
      expect(() => {
        function raul () {
         /* product
            .setName('teste')
            .setPrice(1)
            .calculateMethod(true)
            .setQuantity('Aa21')
            ._validateInformations()
              console.log(product)*/
        }
        
      

        expect(raul).toThrowError(/VAI TOMAR NO CU/)
          
      })
    })
    test('throw on pass invalid type for Price (NaN)', () => {
      expect(product.setPrice('Aa21')).toThrow()
    })
    test('throw on pass invalid type for Calculate Method (isNotBoolean)', () => {
      expect(product.calculateMethod('11')).toThrow()
    })
  })
  // Nullables
  describe('Null or undefine values', () => {
    test('throw on pass name arg. null or empty', () => {
      expect(product.setName()).toThrow()
    })
    test('throw on pass quantity arg. null or empty', () => {
      expect(product.setQuantity()).toThrow()
    })
    test('throw on pass price arg. null or empty', () => {
      expect(product.setPrice()).toThrow()
    })
  })

  describe('Throw to try execute some method without all informations', () => {

    test('should throw error on calculateTotal', () => {
      expect(() => {
        product.calculateTotal()
      }).toThrow()
    })

    test('should throw error on generateId', () => {
      expect(() => {
        product.generateId()
      }).toThrow()
    })
    test('should throw error on getInnerHTML', () => {
      expect(() => {
        product.getInnerHTML()
      }).toThrow()
    })
  })
})
