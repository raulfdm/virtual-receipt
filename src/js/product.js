const Product = function () {
    this.id;
    this.name;
    this.quantity;
    this.price;
    this.total;
}
Product.prototype.setName = function (name) {
    this.name = name;
    return this;
}
Product.prototype.setQuantity = function (quantity) {
    this.quantity = quantity;
    return this;
}
Product.prototype.setPrice = function (price) {
    this.price = price;
    return this;
}
Product.prototype.calculateTotal = function () {
    this.total = parseFloat((this.quantity * this.price).toFixed(2))
    return this;
}
Product.prototype._validateInformations = function () {
    let error = ""
    if (!this.name) {
        error = "Name needs to be defined"
    } else if (!this.price) {
        error = "Name needs to be defined"
    } else if (!this.quantity) {
        error = "Name needs to be defined"
    }
    if (error) {
        throw new Error(error);
    }
    return true;
}
Product.prototype.generateId = function () {
    if(this._validateInformations){
        this.id = new Date().getTime()+this.name+this.price+this.quantity
    }
    return this;
}
Product.prototype.getInnerHTML = function () {
    return `
        <li class="list-group-item product-list__item justify-content-between" data-id="${this.id}">
            ${this.quantity}x - ${this.name} - € ${this.total} ${this.quantity!=1 ? `(€ ${this.price} each)`: ""}
            <button type="button" class="btn btn-danger badge badge-danger badge-pill btn-remove-product"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </li>
    `
}

//code to remove element
/*btn.addEventListener('click',function(e){
e.target.parentNode.remove()
})*/