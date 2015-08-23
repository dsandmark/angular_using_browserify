'use strict';

var _ = require('lodash'),
    servicesModule = require('../service_index.js');

servicesModule
  .service('gameService', GameService);

/*
 * Stores ping pong games with two players in each game.
 */
function GameService() {
  var games,
      service;

  service = {
    addGame: addGame,
    getGames: getGames,
    removeGame: removeGame
  };

  initialise();

  return service;

  /**
   * Adds a game.
   * @param {Object} game Info on players and sets
   * @returns {void}
   *
   * @example
   * addGame({
   *   playerOneName: 'player 1',
   *   playerTwoName: 'player 2',
   *   sets: [{
   *     playerOneScore: 11,
   *     playerTwoScore: 7
   *   }]
   * });
   */
  function addGame(game) {
    game.playerOneWonSets = _.filter(game.sets, function(set) {
      return set.playerOneScore > set.playerTwoScore;
    }).length;

    game.playerTwoWonSets = _.filter(game.sets, function(set) {
      return set.playerTwoScore > set.playerOneScore;
    }).length;

    games.push(game);
  }

  /**
   * Removes a game.
   * @param  {Object} game Game to remove
   * @returns {void}
   */
  function removeGame(game) {
    var index = games.indexOf(game);
    games.splice(index, 1);
  }

  /**
   * Returns all games.
   * @returns {Array} List of games
   */
  function getGames() {
    return games;
  }

  /**
   * Called on creation of service. Sets initial values.
   * @returns {void}
   */
  function initialise() {
    games = [];
  }
}
