/* global angular */
/**
 * Main controller
 */
angular.module('gulpgenerator').controller('PredefinedTasksController', function GulpfileController($scope,  $routeParams, $rootScope, TaskService) {

  $scope.addMode = function() {
    if (!$scope.predefinedTasks) {
      TaskService.getPredefinedTasks().then(function(response) {
        $scope.predefinedTasks = response.data.tasks;
      });
    }
  };
  
  /**
   * Select a predefined task and notify the gulpfile
   */
  $scope.select = function(task) {
    $rootScope.$broadcast('ADD-TASK', angular.copy(task));
  };
  
  /**
   * Switch to add mode
   */
  $scope.$on('ADD-MODE', function() {
    $scope.addMode();
  });

});