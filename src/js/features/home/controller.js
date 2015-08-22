'use strict';

var controllersModule = require('../controller_index');

controllersModule
  .controller('HomeController', HomeController);

function HomeController(playerService) {
  var vm = this;

  vm.addPlayer = addPlayer;
  vm.showAddPlayer = showAddPlayer;

  initalise();

  /**
   * Adds a player.
   * @returns {void}
   */
  function addPlayer() {
    playerService.addPlayer(vm.newPlayerName);
    vm.newPlayerName = '';

    hideAddPlayer();
  }

  /**
   * Hides "Add Player" container.
   * @returns {void}
   */
  function hideAddPlayer() {
    vm.showAddPlayerContainer = false;
  }

  /**
   * Shows "Add Player" container.
   * @returns {void}
   */
  function showAddPlayer() {
    vm.showAddPlayerContainer = true;
  }

  /**
   * Called on creation of controller. Sets initial values.
   * @returns {void}
   */
  function initalise() {
    vm.players = playerService.getPlayers();

    vm.newPlayerName = '';
    vm.showAddPlayerContainer = false;
    vm.nrOfPlayersToShow = 2;
  }
}
