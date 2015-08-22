'use strict';

module.exports = function(config) {

  config.set({

    basePath: '../',
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    reporters: ['progress'],

    autoWatch: false,
    runOnce: true,

    proxies: {
      '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    files: [
      // 3rd-party resources
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/sinon/pkg/sinon.js',

      // app-specific code
      'dist/js/bundle.js',

      // test files
      'src/js/**/*.spec.js'
    ]

  });

};
