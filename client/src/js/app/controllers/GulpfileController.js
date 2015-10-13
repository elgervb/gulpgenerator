/* global angular */
/**
 * Main controller
 */
angular.module('gulpgenerator').controller('GulpfileController', function GulpfileController($scope,  $routeParams, $rootScope, $log, TaskService) {

  TaskService.getGulpfile($routeParams.guid).then(function(gulpfile) {
    $scope.gulpfile = gulpfile;
  });

  $scope.scope = {};

  /**
   * Toggle a task and show the task body
   */
  $scope.toggle = function(task, force) {
    if (!force && $scope.toggled === task.name) {
      delete $scope.toggled;
      delete $scope.editmode;
    } else {
      $log.debug('Toggle task', task);
      $scope.toggled = task.name;
    }
  };

  /**
   * Switch the app into add mode
   */
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
    .then(function(tasks){
      $scope.gulpfile.tasks = tasks;
      $scope.toggle(task, true); // Force toggle to open the task
      $scope.editmode = true;
    })
    .catch(function() {
      $scope.error = 'An error occured.';
    });
  });
  
});