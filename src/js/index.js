const application = {
  productList: [],
  total: 0.0
}

const LOCAL_STORAGE = {
  space: 'list_of_products',
  cleanList: function () {
    localStorage.removeItem(this.space)
  },
  update: function (list) {
    if (!list)
      throw new Error('To update localStorage, some value is required')
    localStorage.setItem(this.space, JSON.stringify(list))
    return this.getStorage()
  },
  getStorage: function () {
    const listOfObjects = JSON.parse(localStorage.getItem(this.space)) || []
    return listOfObjects.map(object => {
      return createProduct(object)
    })
  }
}

const getDecimal = (value) => {
  return parseFloat(Number(value).toFixed(2))
}

const createProduct = (product) => {
  return new Product()
    .setName(product.name)
    .setQuantity(product.quantity)
    .setPrice(product.price)
    .setId(product.id)
    .calculateMethod(product.isPerItem
      ? true
      : false)
    .calculateTotal()
}

const loadGrid = (listOfProducts) => {
  const $listContent = document.querySelector('.list-content')
  const result = listOfProducts.reduce((prev, product) => prev += product.getInnerHTML(), '')

  $listContent.innerHTML = result
  updateTotal(listOfProducts)
}

const saveProduct = (product) => {
  application
    .productList
    .push(product)

  loadGrid(LOCAL_STORAGE.update(application.productList))
}

const cleanProductList = () => {
  let arrayOfProductNodes = [...document.querySelectorAll('.product-list__item')]
  arrayOfProductNodes.map(node => node.remove())
  application.productList.length = 0
  LOCAL_STORAGE.cleanList()
  updateTotal()
}

const updateTotal = (productList = []) => {
  const $totalBill = document.querySelector('.list-footer__total-value')
  let newTotal = 0.0
  if (productList.length > 0) {
    newTotal = productList.reduce((amount, product) => getDecimal(amount + product.total), 0.0)
  } else {
    newTotal = '0.00'
  }

  $totalBill.textContent = newTotal
}

const cleanInputs = () => {
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

const deleteProduct = (idProduct) => {
  const newList = application.productList.filter(product => product.id !== parseInt(idProduct))
  application.productList = newList
  LOCAL_STORAGE.update(newList)
  loadGrid(newList)
}

const $buttonInsertItem = document.querySelector('#btn-insert')
const $buttonCleanList = document.querySelector('#btn-clean')
const $buttonDeleteElements = document.querySelector('#btn-delete-itens')

application.productList = LOCAL_STORAGE.getStorage()
loadGrid(application.productList)

$buttonInsertItem.addEventListener('click', function (event) {
  const $inputs = {
    name: document.querySelector('#product-name'),
    qtde: document.querySelector('#product-qtde'),
    price: document.querySelector('#product-price'),
    calcMethod: document.querySelector('#product-method__item')
  }
  const product = createProduct({name: $inputs.name.value, quantity: $inputs.qtde.value, price: $inputs.price.value, isPerItem: $inputs.calcMethod.checked})
  saveProduct(product)
  cleanInputs()
})

$buttonCleanList.addEventListener('click', function (event) {
  if (confirm('Do you really want to clean this list?')) {
    cleanProductList()
  }
})

$buttonDeleteElements.addEventListener('click', function (e) {
  const $list = document.querySelectorAll('.product-list__item')
  const productsChecked = [...$list].filter(element => element.children[0].checked)
  if (productsChecked.length > 0) {
    if (confirm(`Do you really like to delete ${productsChecked.length} itens?`)) {
      productsChecked.map(product => {
        deleteProduct(product.dataset.id)
        product.remove()
      })
    }
  }
})

window.onerror = (e) => {
  console.warn('AQUI>', e)
}
