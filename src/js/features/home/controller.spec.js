'use strict';

describe('HomeController', function() {
  var controller,
      createController,
      playerMock,
      playerServiceMock,
      tenPlayers,
      threePlayers;

  beforeEach(module('app'));

  beforeEach(function() {
    playerMock = {
      lost: 0,
      name: 'name',
      points: 0,
      rank: 0,
      won: 0
    };

    threePlayers = [
      playerMock,
      playerMock,
      playerMock
    ];

    tenPlayers = [
      playerMock,
      playerMock,
      playerMock,
      playerMock,
      playerMock,
      playerMock,
      playerMock,
      playerMock,
      playerMock,
      playerMock
    ];

    playerServiceMock = {
      addPlayer: sinon.stub(),
      getPlayers: sinon.stub()
    };
  });

  beforeEach(inject(function($controller) {
    createController = function() {
      controller = $controller('HomeController', {
        playerService: playerServiceMock
      });
    };
  }));

  it('should exist', function() {
    createController();

    expect(controller).toBeDefined();
  });

  it('should get players on initalisation', function() {
    playerServiceMock.getPlayers.returns([playerMock]);

    createController();

    expect(controller.players).toEqual([playerMock]);
  });

  it('shouldn\'t show "Add Player" on initalisation', function() {
    createController();

    expect(controller.showAddPlayerContainer).toEqual(false);
  });

  it('should load more players, if available', function() {
    playerServiceMock.getPlayers.returns(tenPlayers);
    createController();

    controller.loadMorePlayers();

    expect(controller.nrOfPlayersShowing).toEqual(7);
  });

  it('should\'t load more players than what is available', function() {
    playerServiceMock.getPlayers.returns(threePlayers);
    createController();

    controller.loadMorePlayers();

    expect(controller.nrOfPlayersShowing).toEqual(3);
  });

});
