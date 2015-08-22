'use strict';

describe('Basket Service', function() {
  var cuffLinksProductMock,
      expectedValue,
      service,
      tShirtProductMock;

  beforeEach(module('app'));

  beforeEach(function() {
    cuffLinksProductMock = {
      id: 1,
      imgName: 'cufflinks.jpg',
      name: 'Personalised cufflinks',
      price: 45
    };

    tShirtProductMock = {
      id: 2,
      imgName: 'tshirt.jpg',
      name: 'Kids T-shirt',
      price: 19.95
    };
  });

  beforeEach(inject(function(basketService) {
    service = basketService;
  }));

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it('should expose a public api', function() {
    expect(service.addProduct).toBeDefined();
    expect(service.getProducts).toBeDefined();
    expect(service.getTotalPrice).toBeDefined();
  });

  it('should store an added product', function() {
    expectedValue = [cuffLinksProductMock];

    service.addProduct(cuffLinksProductMock);

    expect(service.getProducts()).toEqual(expectedValue);
  });

  it('should set quantity to 1 when product not already in basket is added', function() {
    expectedValue = [{
      id: 1,
      imgName: 'cufflinks.jpg',
      name: 'Personalised cufflinks',
      price: 45,
      quantity: 1
    }];

    service.addProduct(cuffLinksProductMock);

    expect(service.getProducts()).toEqual(expectedValue);
  });

  it('should increment quantity of a product if it\'s added more than once', function() {
    expectedValue = [{
      id: 1,
      imgName: 'cufflinks.jpg',
      name: 'Personalised cufflinks',
      price: 45,
      quantity: 2
    }];

    service.addProduct(cuffLinksProductMock);
    service.addProduct(cuffLinksProductMock);

    expect(service.getProducts()).toEqual(expectedValue);
  });

  it('should return one product if basket only contains one product', function() {
    expectedValue = [{
      id: 1,
      imgName: 'cufflinks.jpg',
      name: 'Personalised cufflinks',
      price: 45,
      quantity: 1
    }];

    service.addProduct(cuffLinksProductMock);

    expect(service.getProducts()).toEqual(expectedValue);
  });

  it('should return correct quantity if basket contains multiple occurrences of the same product', function() {
    expectedValue = [{
      id: 1,
      imgName: 'cufflinks.jpg',
      name: 'Personalised cufflinks',
      price: 45,
      quantity: 2
    }];

    service.addProduct(cuffLinksProductMock);
    service.addProduct(cuffLinksProductMock);

    expect(service.getProducts()).toEqual(expectedValue);
  });

  it('should return multiple products if basket contains multiple products', function() {
    expectedValue = [{
        id: 1,
        imgName: 'cufflinks.jpg',
        name: 'Personalised cufflinks',
        price: 45,
        quantity: 1
      },
      {
        id: 2,
        imgName: 'tshirt.jpg',
        name: 'Kids T-shirt',
        price: 19.95,
        quantity: 1
      }
    ];

    service.addProduct(cuffLinksProductMock);
    service.addProduct(tShirtProductMock);

    expect(service.getProducts()).toEqual(expectedValue);
  });

  it('should set total price to 0 on creation', function() {
    expect(service.getTotalPrice()).toEqual(0);
  });

  it('should return total price when multiple products have been added', function() {
    expectedValue = cuffLinksProductMock.price + tShirtProductMock.price;

    service.addProduct(cuffLinksProductMock);
    service.addProduct(tShirtProductMock);

    expect(service.getTotalPrice()).toBe(expectedValue);
  });

  it('should return total price when multiple products in different quantities have been added', function() {
    expectedValue = cuffLinksProductMock.price * 2 + tShirtProductMock.price * 2;

    service.addProduct(cuffLinksProductMock);
    service.addProduct(cuffLinksProductMock);
    service.addProduct(tShirtProductMock);
    service.addProduct(tShirtProductMock);

    expect(service.getTotalPrice()).toBe(expectedValue);
  });

  it('should return total price when more than one of the same product has been added', function() {
    expectedValue = cuffLinksProductMock.price * 2;

    service.addProduct(cuffLinksProductMock);
    service.addProduct(cuffLinksProductMock);

    expect(service.getTotalPrice()).toBe(expectedValue);
  });

});
