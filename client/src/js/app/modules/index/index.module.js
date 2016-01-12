/* global angular */
(() => {
  let module = angular.module('gulpgenerator.index', ['ui.router', 'ngMessages']);
  
  module.config(($stateProvider) => {

    $stateProvider
    .state('index', {
      url: '/',
      controller: 'index.controller',
      templateUrl: 'modules/index/controllers/index.controller.html'
    });
  });
  
})();
