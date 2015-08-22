'use strict';

require('angular');
require('angular-route');

require('./templates');
require('./features/controller_index');
require('./features/directive_index');
require('./features/service_index');

var dependencies = [
  'ngRoute',
  'app.controllers',
  'app.directives',
  'app.services',
  'app.templates'
];

// Mount on window for testing.
window.app = angular.module('app', dependencies);

angular.module('app').config(require('./routes'));

angular.bootstrap(document, ['app'], { strictDi: true });
