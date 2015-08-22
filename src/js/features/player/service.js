'use strict';

var servicesModule = require('../service_index.js');

servicesModule
  .service('playerService', PlayerService);

/*
 * Stores ping pong players.
 * Each player contains:
 *   lost {Number} Number of games lost
 *   name {String} First and last name of player,
 *   points {Number} Arbitrary points,
 *   rank {Number} Player's rank in league,
 *   won {Number} Number of games won
 *
 */
function PlayerService() {
  var players,
      nextPlayerRank,
      service;

  service = {
    addPlayer: addPlayer,
    getPlayers: getPlayers
  };

  initialise();

  return service;

  /**
   * Adds a player.
   * @param {Object} name of player
   * @returns {void}
   */
  function addPlayer(name) {
    var player = {
      lost: 0,
      name: name,
      points: 0,
      rank: getNextPlayerRank(),
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
   * Creates a rank for a new player.
   * @returns {Number} rank
   */
  function getNextPlayerRank() {
    nextPlayerRank++;

    return nextPlayerRank;
  }

  /**
   * Called on creation of service. Sets initial values.
   * @returns {void}
   */
  function initialise() {
    players = [];
    nextPlayerRank = 0;
  }
}
