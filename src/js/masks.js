Inputmask({
  mask: '9{1,9}.99',
  placeholder: '0',
  greedy: false,
  showMaskOnFocus: false,
  numericInput: true
}).mask(document.querySelector('#product-price'))
