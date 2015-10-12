/* global angular */
/**
 * Main controller
 */
angular.module('gulpgenerator').controller('GulpfileController', function GulpfileController($scope,  $routeParams, $rootScope, TaskService) {

  TaskService.getGulpfile($routeParams.guid).then(function(gulpfile) {
    $scope.gulpfile = gulpfile;
  });

  $scope.scope = {};
  $scope.scope.editmode = false;

  /**
   * Toggle a task and show the task body
   */
  $scope.toggle = function(task, force) {
    if (!force && $scope.toggled === task) {
      delete $scope.toggled;
      delete $scope.scope.editmode;
    } else {
      $scope.toggled = task;
    }
  };

  $scope.addMode = function() {
    $rootScope.$broadcast('ADD-MODE');
  };
  
  /**
   * Delete a task from the list
   */
  $scope.delete = function(task) {
    $scope.gulpfile.tasks = $scope.gulpfile.tasks.filter(function(value, index) {
      return value.type !== task.type && value.name !== task.name;
    });
  };
  
  $scope.$on('ADD-TASK', function(event, task) {
    // Add task
    TaskService.addTask($routeParams.guid, task)
    .then(function(tasks) { // New task will be returned in response.dat
      $scope.gulpfile.tasks = tasks;
      $scope.toggle(task, true); // Force toggle to open the task
      $scope.scope.editmode = true;
      $scope.showAdd = false;
    })
    .catch(function() {
      $scope.error = 'An error occured.';
    });
  });
  
});