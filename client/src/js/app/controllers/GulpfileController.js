/* global angular */
/**
 * Gulpfile controller
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
    // do not toggle when task is in edit mode
    if ($scope.isEdit(task)){
      return;
    } else {
      $scope.edit();
    }
    
    if (!forceOpen && $scope.toggled === task) {
      delete $scope.toggled;
      delete $scope.editTask;
    } else {
      $log.debug('Toggle task', task);
      $scope.toggled = task;
    }
  };
  
  $scope.edit = function(task) {
    $log.debug('edit task', task);
    $scope.editTask = task;
  }
  
  $scope.isEdit = function(task) {
    return $scope.editTask === task;
  }

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
      $scope.edit(task);
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
      $scope.edit(task);
    })
    .catch(function() {
      $scope.error = 'An error occured.';
    });
  });
  
});