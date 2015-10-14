/* global angular */
/**
 * Main controller
 */
angular.module('gulpgenerator').controller('GulpfileController', function GulpfileController($scope,  $routeParams, $log, TaskService) {

  TaskService.getGulpfile($routeParams.guid).then(function(gulpfile) {
    $scope.gulpfile = gulpfile;
  });

  $scope.scope = {};
  
  /**
   * Toggle a task and show the task body
   */
  $scope.toggle = function(task, forceOpen) {
    if ($scope.editmode){return;}
    if (!forceOpen && $scope.toggled === task) {
      delete $scope.toggled;
      delete $scope.editmode;
    } else {
      $log.debug('Toggle task', task);
      $scope.toggled = task;
    }
  };

  /**
   * Switch the app into add mode
   */
  $scope.addMode = function() {
    $scope.$broadcast('ADD-MODE');
  };
  
  /**
   * Delete a task from the list
   */
  $scope.delete = function(task) {
    $scope.gulpfile.tasks = $scope.gulpfile.tasks.filter(function(value, index) {
      return value.type !== task.type && value.name !== task.name;
    });
  };
  
  /**
   * Validate the form to make sure that there is only one task with each name
   */
  $scope.validate = function(form, task) {
    var duplicates = $scope.gulpfile.tasks.filter(function(value, index) {
      return value.name === task.name;
    });
    
    if (duplicates.length > 1 ) {
      $scope.error = 'There is already a task with name ' + task.name;
    } else {
      $scope.editmode = !$scope.editmode;
    }
  };
  
  /**
   * Listen to ADD-TASK event. Add a new task to the current gulpfile 
   */
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