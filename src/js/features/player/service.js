'use strict';

var _ = require('lodash'),
    servicesModule = require('../service_index.js');

servicesModule
  .service('playerService', PlayerService);

/*
 * Stores ping pong players.
 * Each player contains:
 *   lost {Number} Number of games lost
 *   name {String} First and last name of player,
 *   points {Number} Arbitrary points,
 *   won {Number} Number of games won
 *
 */
function PlayerService() {
  var players,
      service;

  service = {
    addPlayer: addPlayer,
    getPlayers: getPlayers,
    updatePlayersGameAdded: updatePlayersGameAdded,
    updatePlayersGameRemoved: updatePlayersGameRemoved
  };

  initialise();

  return service;

  /**
   * Adds a player.
   * @param {String} name of player
   * @returns {void}
   */
  function addPlayer(name) {
    var player = {
      lost: 0,
      name: name,
      points: 0,
      won: 0
    };

    players.push(player);
  }

  /**
   * Returns all players.
   * @returns {Array} List of players
   */
  function getPlayers() {
    return players;
  }

  /**
   * Finds a player.
   * @param  {String} name Name of player to find
   * @returns {Object} player with name @param name
   *
   * @example
   * getPlayer('Bob') ->
   * {
   *   lost: 0
   *   name: 'Bob',
   *   points: 90,
   *   won: 3
   * }
   */
  function getPlayer(name) {
    return _.find(players, function(player) {
      return player.name === name;
    });
  }

  /**
   * Updates players with data from a new game.
   * @param  {Object} game Game with new data
   * @returns {void}
   */
  function updatePlayersGameAdded(game) {
    var playerOne = getPlayer(game.playerOneName);
    var playerTwo = getPlayer(game.playerTwoName);

    var playerOneWonSets = 0;
    var playerTwoWonSets = 0;

    _.forEach(game.sets, function(set) {
      if (set.playerOneScore > set.playerTwoScore) {
        playerOneWonSets++;
      } else {
        playerTwoWonSets++;
      }

      playerOne.points += set.playerOneScore;
      playerTwo.points += set.playerTwoScore;
    });

    if (playerOneWonSets > playerTwoWonSets) {
      playerOne.won += 1;
      playerTwo.lost += 1;

    } else if (playerOneWonSets < playerTwoWonSets) {
      playerTwo.won += 1;
      playerOne.lost += 1;

    } else {
      console.error('It\'s a tie. Go play some more!');
    }
  }

  /**
   * Updates players when a game is removed.
   * @param  {Object} game Game with new data
   * @returns {void}
   */
  function updatePlayersGameRemoved(game) {
    var playerOne = getPlayer(game.playerOneName);
    var playerTwo = getPlayer(game.playerTwoName);

    var playerOneWonSets = 0;
    var playerTwoWonSets = 0;

    _.forEach(game.sets, function(set) {
      if (set.playerOneScore > set.playerTwoScore) {
        playerOneWonSets++;
      } else {
        playerTwoWonSets++;
      }

      playerOne.points -= set.playerOneScore;
      playerTwo.points -= set.playerTwoScore;
    });

    if (playerOneWonSets > playerTwoWonSets) {
      playerOne.won -= 1;
      playerTwo.lost -= 1;

    } else if (playerOneWonSets < playerTwoWonSets) {
      playerTwo.won -= 1;
      playerOne.lost -= 1;
    }
  }

  /**
   * Called on creation of service. Sets initial values.
   * @returns {void}
   */
  function initialise() {
    players = [];
  }
}
