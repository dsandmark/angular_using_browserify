'use strict';

describe('HomeController', function() {
  var playerServiceMock,
      controller;

  beforeEach(module('app'));

  beforeEach(function() {
    playerServiceMock = {
      addPlayer: sinon.stub(),
      clearPlayers: sinon.stub(),
      getPlayers: sinon.stub()
    };
  });

  beforeEach(inject(function($controller) {
    controller = $controller('HomeController', {
      playerService: playerServiceMock
    });
  }));

  it('should exist', function() {
    expect(controller).toBeDefined();
  });

});
