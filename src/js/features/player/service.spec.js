'use strict';

describe('Player Service', function() {
  var service;

  beforeEach(module('app'));

  beforeEach(inject(function(playerService) {
    service = playerService;
    service.clearPlayers();
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
      rank: 1,
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
      rank: 1,
      won: 0
    }, {
      lost: 0,
      name: 'player #2',
      points: 0,
      rank: 2,
      won: 0
    }];

    service.addPlayer('player #1');
    service.addPlayer('player #2');

    expect(service.getPlayers()).toEqual(twoPlayers);
  });

  it('should assign an added player the subsequent rank', function() {
    var secondPlayerRank;
    var PLAYER_RANKED_SECOND_INDEX = 1;

    service.addPlayer('player ranked #1');
    service.addPlayer('player ranked #2');
    secondPlayerRank = service.getPlayers()[PLAYER_RANKED_SECOND_INDEX].rank;

    expect(secondPlayerRank).toEqual(2);
  });

  it('should return an empty array if no players exist', function() {
    expect(service.getPlayers()).toEqual([]);
  });

  it('should be able to clear players', function() {
    service.addPlayer('player #1');
    service.addPlayer('player #2');

    service.clearPlayers();

    expect(service.getPlayers()).toEqual([]);
  });

});
