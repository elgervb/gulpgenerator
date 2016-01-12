/* global angular */
(() => {
  let module = angular.module('gulpgenerator.settings', ['ui.router', 'ngMessages']);
  
  module.config(($stateProvider) => {
    
    $stateProvider
    .state('settings', {
      url: '/settings',
      controller: 'settings.controller',
      templateUrl: 'modules/settings/controllers/settings.html'
    })
      .state('settings.app', {
        url: '/app',
        templateUrl: 'modules/settings/controllers/settings.application.html'
      })
      .state('settings.repository', {
        url: '/repository',
        templateUrl: 'modules/settings/controllers/settings.repository.html'
      })
      .state('settings.author', {
        url: '/author',
        templateUrl: 'modules/settings/controllers/settings.author.html'
      })
      .state('settings.defaults', {
        url: '/defaults',
        templateUrl: 'modules/settings/controllers/settings.defaults.html'
      })
      .state('settings.confirm', {
        url: '/confirm',
        templateUrl: 'modules/settings/controllers/settings.confirm.html'
      });
  });
  
})();
