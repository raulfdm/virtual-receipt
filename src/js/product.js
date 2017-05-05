const Product = function () {
  this.id
  this.name
  this.quantity
  this.price
  this.isPerItem
  this.total
}

Product.prototype.setName = function (name) {
  this.name = name
  return this
}
Product.prototype._stringToFloat = function (value) {
  return parseFloat(value)
}

Product.prototype.setQuantity = function (quantity) {
  this.quantity = this._stringToFloat(quantity)
  return this
}
Product.prototype.setPrice = function (price) {
  this.price = this._stringToFloat(price)
  return this
}
Product.prototype.calculateMethod = function (isPerItem) {
  this.isPerItem = isPerItem
  return this
}
Product.prototype.calculateTotal = function () {
  this._validateInformations()

  if (this.isPerItem) {
    this.total = parseFloat((this.quantity * this.price).toFixed(2))
  } else {
    this.total = this.price
    this.price = parseFloat((this.total / this.quantity).toFixed(2))
  }

  return this
}
Product.prototype._parseDecimal = function (value) {
  return parseFloat(value.toFixed(2))
}
Product.prototype._validateInformations = function () {
  let error = ''
  if (!this.name) {
    error = 'Name needs to be defined'
  } else if (!this.price) {
    error = 'Price needs to be defined'
  } else if (!this.quantity) {
    error = 'Quantity needs to be defined'
  } else if (!this.isPerItem) {
    console.log(this.isPerItem, typeof this.isPerItem, typeof this.isPerItem === 'boolean')
    if (typeof this.isPerItem !== 'boolean') {
      error = 'Calculate method must be a boolean.'
    }else if(this.isPerItem === undefined || this.isPerItem === null) {
      error = 'Calculate Method (isPerItem) needs to be defined'
    }
  } else if (isNaN(this.price)) {
    error = `Price must be a valide number (int or float)`
  } else if (isNaN(this.quantity)) {
    error = `Quantity must be a valide number (int or float).`
  }
  if (error) {
    throw new Error(error)
  }
  return true
}
Product.prototype.generateId = function () {
  if (this._validateInformations()) {
    this.id = (new Date().getTime() + this.name + this.price + this.quantity)
      .replace(/\s/g, '')
      .toUpperCase()
    return this
  }
}
Product.prototype.getInnerHTML = function () {
  if (this._validateInformations()) {
    return `
        <label class="checkbox product-list__item" data-id="${this.id}">
                        <input type="checkbox">
                            ${this.quantity}x - ${this.name} - € ${this.total} ${this.quantity > 1
            ? `(€ ${this._parseDecimal(this.total / this.quantity)} each)`
            : ''}
                        </input>
        </label>
    `
  }
}
