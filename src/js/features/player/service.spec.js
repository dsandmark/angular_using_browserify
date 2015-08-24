'use strict';

describe('Player Service', function() {
  var service;

  beforeEach(module('app'));

  beforeEach(inject(function(playerService) {
    service = playerService;
  }));

  it('should exist', function() {
    expect(service).toBeDefined();
  });

  it('should expose a public api', function() {
    expect(service.addPlayer).toBeDefined();
    expect(service.getPlayers).toBeDefined();
  });

  it('should store an added player', function() {
    var player = [{
      lost: 0,
      name: 'player name',
      points: 0,
      won: 0
    }];

    service.addPlayer('player name');

    expect(service.getPlayers()).toEqual(player);
  });

  it('should store multiple added players', function() {
    var twoPlayers = [{
      lost: 0,
      name: 'player #1',
      points: 0,
      won: 0
    }, {
      lost: 0,
      name: 'player #2',
      points: 0,
      won: 0
    }];

    service.addPlayer('player #1');
    service.addPlayer('player #2');

    expect(service.getPlayers()).toEqual(twoPlayers);
  });

  it('should return an empty array if no players exist', function() {
    expect(service.getPlayers()).toEqual([]);
  });

  it('should test updatePlayersGameRemoved', function() {
    // TODO Tests needed if this was an app going to prod.
  });

});
