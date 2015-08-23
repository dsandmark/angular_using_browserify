'use strict';

var controllersModule = require('../controller_index');

controllersModule
  .controller('HomeController', HomeController);

function HomeController(gameService, playerService) {
  var vm = this;

  /**
   * Number of players to load when "Load more" is clicked.
   */
  var ADDITIONAL_PLAYERS_TO_LOAD = 5;

  /**
   * Number of players to load when view is loaded.
   */
  var INITIAL_PLAYERS_SHOWING = 5;

  vm.addGame = addGame;
  vm.addPlayer = addPlayer;
  vm.loadMorePlayers = loadMorePlayers;
  vm.removeGame = removeGame;
  vm.showAddPlayer = showAddPlayer;

  initalise();

  /**
   * Adds a game.
   * @returns {void}
   */
  function addGame() {
    var game = {
      playerOneName: vm.newGamePlayerOne.name,
      playerTwoName: vm.newGamePlayerTwo.name,
      sets: getNewGameSets()
    };

    gameService.addGame(game);
  }

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


  function getNewGameSets() {
    return [{
      playerOneScore: 11,
      playerTwoScore: 7
    }, {
      playerOneScore: 8,
      playerTwoScore: 11
    }, {
      playerOneScore: 11,
      playerTwoScore: 0
    }];
  }

  function loadMorePlayers() {
    vm.nrOfPlayersShowing += ADDITIONAL_PLAYERS_TO_LOAD;

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
    addPlayer('Turk');
    addPlayer('J.D');
    addPlayer('Cox');
    addPlayer('Jan Itor');
    addPlayer('Elliot');
    addPlayer('Bob');
    addPlayer('Carla');
    addPlayer('Ted');
    addPlayer('Laverne');
    addPlayer('Todd');

    vm.newGamePlayerOne = {
      name: 'Turk'
    };
    vm.newGamePlayerTwo = {
      name: 'Cox'
    };
    addGame();

    vm.newGamePlayerOne = {
      name: 'Carla'
    };
    vm.newGamePlayerTwo = {
      name: 'Todd'
    };
    addGame();
  }

  function removeGame(game) {
    gameService.removeGame(game);
  }

  /**
   * Called on creation of controller. Sets initial values.
   * @returns {void}
   */
  function initalise() {
    vm.players = playerService.getPlayers();
    vm.games = gameService.getGames();

    addTestData();

    vm.newPlayerName = '';
    vm.showAddPlayerContainer = false;
    vm.nrOfPlayersShowing = INITIAL_PLAYERS_SHOWING;
    vm.firstPlayerInGame = '';
    vm.secondPlayerInGame = '';
  }
}
