/**
 * Controller to help the user create a new gulp file. This page let's the user enter the 
 * package.json details.
 */
angular.module('gulpgenerator').controller('NewGulpfileController', function NewGulpfileController($scope, $location, TaskService) {

  // defaults
  $scope.gulpfile = {
    version: {
      major: 0,
      minor: 0,
      patch: 1
    }
  };

  /**
   * Continue to the next page: generator where the user can add, edit or delete tasks
   */
  $scope.createGulpfile = function() {
    TaskService.createGulpfile($scope.gulpfile)
    .then(function(gulpfile) {
      $location.path('/gulpfile/' + gulpfile.guid);
    })
    .catch(function(data, status, headers, config) {
      $scope.error = 'Failed to add gulpfile details (Network status: ' + status + ')';
    });

  };

});