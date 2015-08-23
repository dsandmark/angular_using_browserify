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
  vm.calculateWonLostPercentage = calculateWonLostPercentage;
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

    playerService.updatePlayers(game);
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

  /**
   * Calculates Won / Lost %.
   * @param  {Object} player Player to calculate for
   * @returns {Number} won/lost percentage for @param player
   */
  function calculateWonLostPercentage(player) {
    if (player.won === 0 || player.lost === 0) {
      return 0;
    }

    var wonLostPercentage = player.won / (player.won + player.lost) * 100;

    // Converting to Number to get rid of zeroes in e.g. 70.0000.
    return Number(wonLostPercentage.toFixed(4));
  }

  function getNewGameSets() {
    return [{
      playerOneScore: parseInt(vm.newGamePlayerOneScore, 10),
      playerTwoScore: parseInt(vm.newGamePlayerTwoScore, 10)
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

    vm.newGamePlayerOneScore = 11;
    vm.newGamePlayerTwoScore = 7;
    vm.newGamePlayerOne = {
      name: 'Turk'
    };
    vm.newGamePlayerTwo = {
      name: 'Cox'
    };
    addGame();

    vm.newGamePlayerOneScore = 2;
    vm.newGamePlayerTwoScore = 11;
    vm.newGamePlayerOne = {
      name: 'Carla'
    };
    vm.newGamePlayerTwo = {
      name: 'Todd'
    };
    addGame();

    vm.newGamePlayerOneScore = null;
    vm.newGamePlayerTwoScore = null;
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
