'use strict';

var _ = require('lodash'),
    servicesModule = require('../service_index.js');

servicesModule
  .service('basketService', BasketService);

/*
 * Stores products user has added to basket.
 */
function BasketService() {
  var products,
      service;

  service = {
    addProduct: addProduct,
    getProducts: getProducts,
    getTotalPrice: getTotalPrice
  };

  initialise();

  return service;

  /**
   * Adds a product to basket.
   * @param {Object} newProduct Product to add
   * @example Adds a product to basket
   * addProduct({
   *   id: 1,
   *   imgName: 'cufflinks.jpg',
   *   name: 'Personalised cufflinks',
   *   price: 45
   * });
   * @returns {void}
   */
  function addProduct(newProduct) {
    var basketAlreadyContainsProduct,
        existingProduct;

    existingProduct = _.find(products, function(product) {
      return product.id === newProduct.id;
    });

    basketAlreadyContainsProduct = existingProduct;

    if (basketAlreadyContainsProduct) {
      existingProduct.quantity += 1;

    } else {
      newProduct.quantity = 1;
      products.push(newProduct);
    }
  }

  /**
   * Returns all products in basket.
   * @returns {Array} List of products in basket
   */
  function getProducts() {
    return products;
  }

  /**
   * Returns price of all products in basket. Returns 0 if basket is empty.
   * @returns {Number} Total price of all products in basket
   */
  function getTotalPrice() {
    if (_.isEmpty(products)) {
      return 0;
    }

    return _.sum(products, function(product) {
      return product.price * product.quantity;
    });
  }

  /**
   * Called on creation of service. Sets initial values.
   * @returns {void}
   */
  function initialise() {
    products = [];
  }
}
