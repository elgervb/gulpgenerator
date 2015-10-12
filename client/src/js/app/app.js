/**
 * Declaration of the main skeleton app
 */
var app = angular.module('gulpgenerator', ['ngRoute'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(function($routeProvider, $locationProvider) {
  
  // Root; show the main page to the user
  $routeProvider
    .when('/', {
      controller: 'IndexController',
      templateUrl: '/js/app/index/index.html'
    })
    // Route for creating a new Gulpfile
    .when('/gulpfile/create', {
      controller: 'NewGulpfileController',
      templateUrl: '/js/app/gulpfile/NewGulpfileController.html'
    })
    // Route to add tasks to an existing gulpfile
    .when('/gulpfile/:guid', {
      controller: 'GulpfileController',
      templateUrl: '/js/app/gulpfile/GulpfileController.html'
    })
    // Route to add tasks to an existing gulpfile
    .when('/gulpfile/:guid/generate', {
      controller: 'GeneratorController',
      templateUrl: '/js/app/gulpfile/GeneratorController.html'
    });

  $locationProvider.html5Mode('true');

});
