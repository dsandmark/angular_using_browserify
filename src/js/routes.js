'use strict';

/*
 * @ngInject
 */
function Routes($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      controller: 'HomeController',
      controllerAs: 'vm',
      templateUrl: 'home/partial.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}

module.exports = Routes;
