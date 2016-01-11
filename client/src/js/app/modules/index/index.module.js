/* global angular */
(() => {
  let module = angular.module('gulpgenerator.index', ['ui.router', 'ngMessages']);
  
  module.config(($urlRouterProvider, $stateProvider) => {
    // For any unmatched url, redirect to /list
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    .state('index', {
      url: '/',
      controller: 'index.controller',
      templateUrl: 'modules/index/index.controller.html'
    });
  });
  
})();
