/* global angular */
(() => {
  let module = angular.module('gulpgenerator', ['templates', 'gulpgenerator.index', 'gulpgenerator.settings']);
  
  module.config(($urlRouterProvider) => {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
  });
})();
