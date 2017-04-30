/*
1. Get the values from the inputs
2. Get others elements from page
  2.1 Insert Button
  2.2 List
3. Add event to elements that need it
4. Create a function to mount an object with this values (CHAIN FUNCTION)
  4.1 Object containing the following properties:
    4.1.1 name
    4.1.2 quantity
    4.1.3 Price
    4.1.4 Total
    4.1.5 htmlELEMENT
5. Save an Global array to store the products
6. Create a function to save into Array and into a LocalStore
7. Create a function to clean the array and LocalStorage
8. Create a function to fill the List container with all elements from Array of Products
  8.1 Call this function with the first load
9. Create a function to fill the TOTAL
10. Create function to clean inputs (focus on first elem)
*/
'use-strict'
//debugger;
// 1. Get the values from the inputs
const $productName = document.querySelector('#product-name')
const $productQtde = document.querySelector('#product-qtde')
const $productPrice = document.querySelector('#product-price')
const $productList = document.querySelector('.product-list')

// 2. Get others elements from page
const $formProduct = document.querySelector('#form-product')
const $totalProducts = document.querySelector('#container-list__display-total__value')
const $btnInsertProduct = document.querySelector('#btn-insert-product')
const $btnCleanList = document.querySelector('.container-list__btn-clean')

// 5. Save an Global array to store the products
let listOfProducts

// 3. Add event to elements that will need it
$formProduct.addEventListener('submit', function (e) {
  e.preventDefault()
  const product = createProduct({name: $productName.value, price: $productPrice.value, quantity: $productQtde.value})
  saveProduct(product)
  loadGrid()
  cleanInputs()
})

$btnCleanList.addEventListener('click', function (e) {
  const result = confirm('Do you really want to clean the list?')
  if (result) {
    cleanProductList()
    updateTotal()
  }
})

// 4. Create a function to mount a Product with this values (CHAIN FUNCTION)
const createProduct = function (product) {
  return new Product()
    .setName(product.name)
    .setPrice(product.price)
    .setQuantity(product.quantity)
    .generateId()
    .calculateTotal()
}

// 6. Create a function to save into Array and into a LocalStore
const saveProduct = function (product) {
  listOfProducts.push(product)
  localStorage.setItem('listOfProducts', JSON.stringify(listOfProducts))
}
// 7. Create a function to clean the array and LocalStora
const cleanProductList = function () {
  let arrayOfProductNodes = [...document.querySelectorAll('.product-list__item')]

  arrayOfProductNodes.map(node => $productList.removeChild(node))
  listOfProducts.length = 0
  localStorage.removeItem('listOfProducts')
}

// 8. Create a function to fill the List container with all
const fillListProductContainer = function (nodeParent) {
  if (listOfProducts) {
    const html = listOfProducts.reduce((result, product) => {
      return result + product.getInnerHTML()
    }, '')
    nodeParent.innerHTML = html
  }
}

const loadLocalList = function () {
  let list = JSON.parse(localStorage.getItem('listOfProducts'))
  if (!list) {
    return []
  } else {
    return list.map(product => createProduct(product))
  }
}
const cleanInputs = function () {
  $productName.value = ''
  $productName.focus()
  $productPrice.value = ''
  $productQtde.value = '1'
}

const loadGrid = function () {
  fillListProductContainer($productList)
  addEventToBtnRemove()
  updateTotal()
}

const updateTotal = function () {
  const newTotal = listOfProducts.reduce((amount, product) => amount + getDecimalFix(product.total), 0.0)
  $totalProducts.textContent = getDecimalFix(newTotal);
}

const addEventToBtnRemove = function () {
  const btnRemoveElements = [...document.querySelectorAll('.btn-remove-product')]
  btnRemoveElements.map(btn => {
    btn.addEventListener('click', removeSpecificElement)
  })
}

const removeSpecificElement = function (event) {
  const answer = confirm('Do you really want to remove this item?');
  if (answer && event.currentTarget.nodeName==="BUTTON") {
    const parent = event.currentTarget.parentNode
  
    const id = parent.dataset.id
    const newProductList = listOfProducts.filter(product => product.id !== id)
    parent.remove()
    updateList(newProductList)
    updateTotal()
  }
}

const updateList = function (newProductList) {
  listOfProducts = newProductList
  localStorage.setItem('listOfProducts', JSON.stringify(listOfProducts))
}

const boostrap = function () {
  listOfProducts = loadLocalList()
  loadGrid()
}

const getDecimalFix = function(value){
  return parseFloat(value.toFixed(2))
}

boostrap()