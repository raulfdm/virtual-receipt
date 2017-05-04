const Product = function () {
    this.id;
    this.name;
    this.quantity;
    this.price;
    this.isPerItem;
    this.total;
}
Product.prototype.setName = function (name) {
    this.name = name;
    return this;
}
Product.prototype.setQuantity = function (quantity) {
    this.quantity = parseFloat(quantity);
    return this;
}
Product.prototype.setPrice = function (price) {
    this.price = parseFloat(price);
    return this;
}
Product.prototype.calculateMethod = function(isPerItem){
    this.isPerItem = isPerItem
    return this;
}
Product.prototype.calculateTotal = function () {
    
    if(this.isPerItem){
        this.total = parseFloat((this.quantity * this.price).toFixed(2))
    }else{
        this.total = this.price;
        this.price = parseFloat((this.total/this.quantity).toFixed(2))
    }
    
    return this;
}
Product.prototype._validateInformations = function () {
    let error = ""
    if (!this.name) {
        error = "Name needs to be defined"
    } else if (!this.price) {
        error = "Price needs to be defined"
    } else if (!this.quantity) {
        error = "Quantity needs to be defined"
    }
    if (error) {
        throw new Error(error);
    }
    return true;
}
Product.prototype.generateId = function () {
    if(this._validateInformations()){
        this.id = (new Date().getTime()+this.name+this.price+this.quantity).replace(/\s/g, '').toUpperCase();
    }
    return this;
}
Product.prototype.getInnerHTML = function () {
    return `
        <label class="checkbox product-list__item" data-id="${this.id}">
                        <input type="checkbox">
                            ${this.quantity}x - ${this.name} - € 5.78 ${this.quantity>1 ? `(€ ${this.total/this.quantity} each)` : ''}
                        </input>
        </label>
    `
}

//code to remove element
/*btn.addEventListener('click',function(e){
e.target.parentNode.remove()
})*/