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

  /**
   * Maximum number of sets per game.
   */
  var MAX_NUMBER_OF_SETS = 5;

  vm.addGame = addGame;
  vm.addPlayer = addPlayer;
  vm.addSetFields = addSetFields;
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
    if (!vm.newGamePlayerOne || !vm.newGamePlayerOne) {
      console.error('Need to have two players in a game.');
      return;
    }

    var game = {
      playerOneName: vm.newGamePlayerOne.name,
      playerTwoName: vm.newGamePlayerTwo.name,
      sets: getNewGameSets()
    };

    gameService.addGame(game);

    playerService.updatePlayers(game);

    vm.newGamePlayerOneScores = [];
    vm.newGamePlayerTwoScores = [];
    vm.nrOfSetFields = [''];
    vm.showAddSet = true;
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
   * Adds two more input fields for set scores.
   * @returns {void}
   */
  function addSetFields() {
    if (vm.nrOfSetFields.length < MAX_NUMBER_OF_SETS) {
      // ng-repeat needs an object to iterate over so an array
      // is used as a counter here.
      vm.nrOfSetFields.push('');
    }

    if (vm.nrOfSetFields.length === MAX_NUMBER_OF_SETS) {
      vm.showAddSet = false;
    }
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
    var sets = [];

    for (var i = 0; i < vm.nrOfSetFields.length; i++) {
      sets.push({
        playerOneScore: parseInt(vm.newGamePlayerOneScores[i], 10),
        playerTwoScore: parseInt(vm.newGamePlayerTwoScores[i], 10)
      });
    }

    return sets;
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

    vm.firstPlayerInGame = '';
    vm.newPlayerName = '';
    vm.nrOfPlayersShowing = INITIAL_PLAYERS_SHOWING;
    vm.nrOfSetFields = [''];
    vm.secondPlayerInGame = '';
    vm.showAddPlayerContainer = false;
    vm.showAddSet = true;

    addTestData();

    vm.newGamePlayerOneScores = [];
    vm.newGamePlayerTwoScores = [];
  }
}
