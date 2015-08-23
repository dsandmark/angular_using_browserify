'use strict';

describe('Game Service', function() {
  var gameMock,
      service;

  beforeEach(module('app'));

  beforeEach(function() {
    gameMock = {
      playerOneName: 'player 1',
      playerTwoName: 'player 2',
      sets: [{
        playerOneScore: 11,
        playerTwoScore: 7
      }]
    };

  });

  beforeEach(inject(function(gameService) {
    service = gameService;
  }));

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it('should expose a public api', function() {
    expect(service.addGame).toBeDefined();
    expect(service.getGames).toBeDefined();
  });

  it('should store an added game', function() {
    service.addGame(gameMock);

    expect(service.getGames()).toEqual([gameMock]);
  });

  it('should calculate how many sets a player has won when adding a game', function() {
    service.addGame(gameMock);

    var addedGame = service.getGames()[0];

    expect(addedGame.playerOneWonSets).toEqual(1);
  });

  it('should be able to remove a game', function() {
    service.addGame(gameMock);
    service.removeGame(gameMock);

    expect(service.getGames()).toEqual([]);
  });

});
