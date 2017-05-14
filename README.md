# Food List Creator
![https://img.shields.io/badge/building-passing-brightgreen.svg](https://img.shields.io/badge/building-passing-brightgreen.svg)
> :page_facing_up: :department_store: A simple way to create a shopping list

![Site Preview](http://i.imgur.com/MYyf08i.png)

## Motivation
I use to control my expanses on [Mobills](mobills.com.br) (a personal finance application). So, every time when I go shopping I create an expanse with the **total** value. However, personally I prefer save what I bought as well, even thought the application doesn't have a specific field for it, only *more information* field.
Therefore, I write manually on some notepad each item and it value, copy this information and paste into it field.

## Solution
Based on motivation above, I decided create a static page with a simple form which receive:
- Product Name
- Quantity
- Price
- Calculate Method (refers to total calculate, in other words, if Price is total or just an item)

When you insert, the application create a product and insert in a list, which are storage in browser LocalStorage, and each item that are added, update total from the list of product.

## Concepts and Technologies
This project involves some interesting things like:

- [LocalStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage)
- [Bulma CSS](http://bulma.io/)
- [ClipboardJS](https://clipboardjs.com)
- [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
- [Method Chaining](https://schier.co/blog/2013/11/14/method-chaining-in-javascript.html)
- [Prototype Pattern](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

## Run locally

1. Clone the project
```sh
$ git clone https://github.com/raulfdm/food-list-creator.git
```
2. Move to project folder and install all dependencies
```sh
$ cd food-list-creator
$ npm install
```

3. Now, you can run a local server with the following command:
```sh
$ npm start
```

## Licence

[MIT](/blob/master/LICENCE.md)
