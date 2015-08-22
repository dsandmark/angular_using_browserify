'use strict';

describe('HomeController', function() {
  var basketServiceMock,
      controller;

  beforeEach(module('app'));

  beforeEach(function() {
    basketServiceMock = {
      addProduct: sinon.stub(),
      getProducts: sinon.stub(),
      getTotalPrice: sinon.stub()
    };
  });

  beforeEach(inject(function($controller) {
    controller = $controller('HomeController', {
      basketService: basketServiceMock
    });
  }));

  it('should exist', function() {
    expect(controller).toBeDefined();
  });

});
