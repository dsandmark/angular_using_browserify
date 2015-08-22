'use strict';

var controllersModule = require('../controller_index');

controllersModule
  .controller('HomeController', HomeController);

function HomeController(basketService) {
  var vm = this;

  vm.addToBasket = addToBasket;

  initalise();

  /**
   * Adds a product with @param productId to basket.
   * @param {Number} productId Id of product to add
   * @returns {void}
   */
  function addToBasket(productId) {
    console.log('example method with productId: ', productId);
  }

  /**
   * Called on creation of controller. Sets initial values.
   * @returns {void}
   */
  function initalise() {
    vm.basket = basketService;
  }
}
