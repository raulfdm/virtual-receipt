# Food List Creator
> :page_facing_up: :department_store: A simple way to create a shopping list

## Motivation
I use to control my expanses on [Mobills](mobills.com.br) (a personal finance application). So,everytime when I go shopping I create an expanse with the **total** value. But, I like to save what I bought, even the application doens't have field for this, only *more information* field. So
I write manually on some notepad each item and it value, copy this informations and paste into it field.

## Solution
Based on motivation above and to practice some concepts, I decided create a static page with a simple form which recieve:
- Product Name
- Quantity
- Price
- Calculate Method (refers to total calculate, in other words, if Price is total or just an item)

When you insert, the application create a product and insert in a content whose have all itens created previously and a sum of all itens.

## Concepts
As said, this project envolves some interesting things like:

- [LocalStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage)
- [Method Chainin](https://schier.co/blog/2013/11/14/method-chaining-in-javascript.html)
- [Bulma CSS](http://bulma.io/)
- [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
- [Prototype Pattern](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

## Run locally

1. Clone the project
```sh
$ git clone https://github.com/raulfdm/food-list-creator.git
```
2. Move to project folder and run npm command
```sh
$ cd food-list-creator
$ npm start
```

## Licence

[MIT](/blob/master/LICENCE.md)
