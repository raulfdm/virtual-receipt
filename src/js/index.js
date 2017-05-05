const application = function () {
  this._localStorage = 'list_of_products'
  this._productList = []
  this.product = {}
  this.total = 0.0
  this._veryLocalStorage()
}
application.prototype.getDecimal = function (value) {
  return parseFloat(value.toFixed(2))
}
application.prototype._veryLocalStorage = function () {
  const list = JSON.parse(localStorage.getItem(this._localStorage))
  if (list) {
    list.map(product => this.createProduct(product)._saveProduct())
    this.loadGrid()
  }
}
application.prototype.createProduct = function (product) {
  debugger
  this.product = new Product()
    .setName(product.name)
    .setQuantity(product.quantity)
    .setPrice(product.price)
    .calculateMethod(product.isPerItem ? true : false)
    .generateId()
    .calculateTotal()

  return this
}
application.prototype._saveProduct = function () {
  this
    ._productList
    .push(this.product)
  localStorage.setItem(this._localStorage, JSON.stringify(this._productList))
  return this
}
application.prototype._resetProduct = function () {
  this.product = new Product()
  return this
}
application.prototype.cleanProductList = function () {
  let arrayOfProductNodes = [...document.querySelectorAll('.product-list__item')]
  arrayOfProductNodes.map(node => node.remove())
  this._productList.length = 0
  localStorage.removeItem(this._localStorage)
  return this
}
application.prototype.loadGrid = function () {
  const $listContent = document.querySelector('.list-content')
  const result = this._productList.reduce((prev, product) => prev += product.getInnerHTML(), '')
  $listContent.innerHTML = result
  this._updateTotal()
  return this
}
application.prototype._updateTotal = function () {
  const $totalBill = document.querySelector('.list-footer__total-value')
  let newTotal = 0.0
  if (this._productList.length > 0) {
    newTotal = this
      ._productList
      .reduce((amount, product) => this.getDecimal(amount + product.total), 0.0)
  }else {
    newTotal = '0.00'
  }
  $totalBill.textContent = newTotal

  return this
}
application.prototype.cleanInputs = function () {
  document
    .querySelector('#product-name')
    .value = ''
  document
    .querySelector('#product-qtde')
    .value = 1
  document
    .querySelector('#product-price')
    .value = ''
}

/*PENDING*/
application.prototype.removeSpecificElement = function () {}

const $buttonInsertItem = document.querySelector('#btn-insert')
const $buttonCleanList = document.querySelector('#btn-clean')

const app = new application()

$buttonInsertItem.addEventListener('click', function (event) {
  const $inputs = {
    name: document.querySelector('#product-name'),
    qtde: document.querySelector('#product-qtde'),
    price: document.querySelector('#product-price'),
    calcMethod: document.querySelector('#product-method__item')
  }

  app
    .createProduct({
      name: $inputs.name.value,
      quantity: $inputs.qtde.value,
      price: $inputs.price.value,
      isPerItem: $inputs.calcMethod.checked
    })
    ._saveProduct()
    ._resetProduct()
    .loadGrid()
    .cleanInputs()
})

$buttonCleanList.addEventListener('click', function (event) {
  app.cleanProductList().loadGrid()
})
