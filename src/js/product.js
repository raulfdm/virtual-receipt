const Product = function () {
  this.id
  this.name
  this.quantity
  this.price
  this.isPerItem
	this.priceUn
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
		this.total = this._parseDecimal(this.quantity*this.price)
		this.priceUn = this.price
  } else {
    this.total = this.price
    this.priceUn = this._parseDecimal(this.total / this.quantity)
  }

  return this
}
Product.prototype._parseDecimal = function (value) {
  return this._stringToFloat(value.toFixed(2))
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
    if (typeof this.isPerItem !== 'boolean') {
      error = 'Calculate method must be a boolean.'
    }else if (this.isPerItem === undefined || this.isPerItem === null) {
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
Product.prototype.setId = function (id) {
  if (id) {
    this.id = parseInt(id)
  }else {
    this._generateId()
  }
  return this
}
Product.prototype._generateId = function () {
  this.id = new Date().getTime() + Math.floor(Math.random() * 100000000)
  return this
}
Product.prototype.getInnerHTML = function () {
  if (this._validateInformations()) {
    return `
        <label class="checkbox product-list__item" data-id="${this.id}">
                        <input type="checkbox">
                            ${this.toString()}
                        </input>
        </label>
    `
  }
}
Product.prototype.toString = function(){
	return `${this.quantity}x - ${this.name} - € ${this.total} ${this.quantity > 1
            ? `(€ ${this.priceUn} each)`
            : ''}`
}
