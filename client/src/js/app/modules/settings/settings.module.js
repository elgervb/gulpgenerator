/* global angular */
(() => {
  let module = angular.module('gulpgenerator.settings', ['ui.router', 'ngMessages']);
  
  module.config(($stateProvider) => {
    
    $stateProvider
    .state('settings', {
      url: '/settings',
      controller: 'settings.controller',
      templateUrl: 'modules/settings/settings.html'
    })
      .state('settings.app', {
        url: '/app',
        templateUrl: 'modules/settings/settings.application.html'
      })
      .state('settings.repository', {
        url: '/repository',
        templateUrl: 'modules/settings/settings.repository.html'
      })
      .state('settings.author', {
        url: '/author',
        templateUrl: 'modules/settings/settings.author.html'
      })
      .state('settings.defaults', {
        url: '/defaults',
        templateUrl: 'modules/settings/settings.defaults.html'
      })
      .state('settings.confirm', {
        url: '/confirm',
        templateUrl: 'modules/settings/settings.confirm.html'
      });
  });
  
})();
