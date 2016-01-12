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
        reports: './reports/',
        test: './tests/'
      }
    };
    
    // TODO for now, get it from local storage
    let gulpfile = localStorage.getItem('gulpfile');
    if (gulpfile) {
      $scope.settings = JSON.parse(gulpfile);
    }
    
    $scope.next = (state) => {
      $state.go(state);
    };
    
    $scope.save = () => {
      localStorage.setItem('gulpfile', JSON.stringify($scope.settings));
    };
  
  });

})();
