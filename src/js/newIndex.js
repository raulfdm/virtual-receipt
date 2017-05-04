const testesGostosos = function () {
    this._localStorage = 'list_of_products'
    this._productList = []
    this.product = {}
    this.total = 0.0
    this.getDecimal = value => parseFloat(value.toFixed(2))

    this.$totalBill = document.querySelector('#list-footer__total-value')
}

testesGostosos.prototype.createProduct = function (product) {
    this.product = new Product()
        .setName(product.name)
        .setQuantity(product.quantity)
        .setPrice(product.price)
        .calculateMethod(product.isPerItem)
        .generateId()
        .calculateTotal()

    this._saveProduct()
    return this
}
testesGostosos.prototype._saveProduct = function () {
    this
        ._productList
        .push(this.product)
    localStorage.setItem(this._localStorage, JSON.stringify(this._productList))
    this.product = new Product()
    return this
}
testesGostosos.prototype.cleanProductList = function () {
    let arrayOfProductNodes = [...document.querySelectorAll('.product-list__item')]
    arrayOfProductNodes.map(node => node.remove())
    this._productList.length = 0
    localStorage.removeItem(this._localStorage)
    return this
}

testesGostosos.prototype.loadList = function () {
    debugger;
    let list = JSON.parse(localStorage.getItem(this._localStorage))
    if (list) {
        this._productList = list.map(product => this.createProduct(product))
    } else {
        this._productList = []
    }
    return this
}

testesGostosos.prototype.updateTotal = function () {
    const newTotal = this
        ._productList
        .reduce((amount, product) => amount + this.getDecimalFix(product.total), 0.0).bind(this)
    this.$totalBill.textContent = newTotal;

    return this;
}

/*PENDING*/
testesGostosos.prototype.removeSpecificElement = function () {}

var teste = new testesGostosos()

teste.loadList().createProduct({
    name: document
        .querySelector('#product-name')
        .value,
    quantity: document
        .querySelector('#product-qtde')
        .value,
    price: document
        .querySelector('#product-price')
        .value,
    isPerItem: document
        .querySelector('#product-method__item')
        .checked
        ? true
        : false
}).updateTotal()

