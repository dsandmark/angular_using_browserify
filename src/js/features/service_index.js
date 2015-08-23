'use strict';

/*
 * Starting point for services. Adds services to 'app.services' module.
 */

module.exports = angular.module('app.services', []);

require('./player/service');
require('./game/service');
