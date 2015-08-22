'use strict';

var controllersModule = require('../controller_index');

controllersModule
  .controller('HomeController', HomeController);

function HomeController(playerService) {
  var vm = this;

  /**
   * Number of players to load when "Load more" is clicked.
   */
  var NR_OF_PLAYERS_TO_LOAD = 5;

  /**
   * Number of players to load when view is loaded.
   */
  var INITIAL_PLAYERS_SHOWING = 5;

  vm.addPlayer = addPlayer;
  vm.loadMorePlayers = loadMorePlayers;
  vm.showAddPlayer = showAddPlayer;

  initalise();

  /**
   * Adds a player.
   * @param {String} name Name of player
   * @returns {void}
   */
  function addPlayer(name) {
    playerService.addPlayer(name);
    vm.newPlayerName = '';

    hideAddPlayer();
  }

  function loadMorePlayers() {
    vm.nrOfPlayersShowing += NR_OF_PLAYERS_TO_LOAD;

    if (vm.nrOfPlayersShowing > vm.players.length) {
      vm.nrOfPlayersShowing = vm.players.length;
    }
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

  /*
   * Adds test data for development.
   * @TODO Remove this when shipping to prod ;)
   */
  function addTestData() {
    addPlayer('player #1');
    addPlayer('player #2');
    addPlayer('player #3');
    addPlayer('player #4');
    addPlayer('player #5');
    addPlayer('player #6');
    addPlayer('player #7');
    addPlayer('player #8');
    addPlayer('player #9');
  }

  /**
   * Called on creation of controller. Sets initial values.
   * @returns {void}
   */
  function initalise() {
    addTestData();

    vm.players = playerService.getPlayers();
    vm.newPlayerName = '';
    vm.showAddPlayerContainer = false;
    vm.nrOfPlayersShowing = INITIAL_PLAYERS_SHOWING;
    vm.firstPlayerInGame = '';
    vm.secondPlayerInGame = '';
  }
}
