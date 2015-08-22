'use strict';

var controllersModule = require('../controller_index');

controllersModule
  .controller('HomeController', HomeController);

function HomeController(playerService) {
  var vm = this;

  vm.addPlayer = addPlayer;

  initalise();

  /**
   * Adds a player.
   * @param {String} name Name of player
   * @returns {void}
   */
  function addPlayer(name) {
    console.log('name', name);
  }

  /**
   * Called on creation of controller. Sets initial values.
   * @returns {void}
   */
  function initalise() {
    vm.players = playerService.getPlayers();
  }
}
