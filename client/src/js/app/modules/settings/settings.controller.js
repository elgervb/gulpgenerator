/* global angular */
(() => {
  angular.module('gulpgenerator.settings').controller('settings.controller', ($scope, $state) => {
    // defaults
    $scope.settings = {
      version: {
        major: 0, minor: 0, patch: 1
      },
      defaults: {
        src: './src/',
        dist: './dist/',
        reports: './reports/'
      }
    };
    
    $scope.next = (state) => {
      $state.go(state);
    };
    
    $scope.save = () => {
      
    };
  
  });

})();
