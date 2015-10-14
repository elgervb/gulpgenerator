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
   * Switch the app into add mode
   */
  $scope.addMode = function() {
    $scope.$broadcast('ADD-MODE');
  };
  
  /**
   * Delete a task from the list
   */
  $scope.delete = function(task) {
    
    TaskService.deleteTask($routeParams.guid, task)
      .then(function(tasks) {
        $scope.gulpfile.tasks = tasks;
      })
      .catch(function() {
        $scope.error = 'An error occured when trying to delete task ' + task.name;
      });
  };
  
  /**
   * Toggle edit mode for the specified task
   * 
   * @param {object} task The task to edit
   */
  $scope.edit = function(task) {
    $log.debug('edit task', task);
    $scope.editTask = task;
  }
  
  /**
   * Check if the task specified is in edit mode
   * 
   * @param {object} task The task to check
   * 
   * @return boolean 
   */
  $scope.isEdit = function(task) {
    return $scope.editTask === task;
  }
  
  /**
   * Toggle a task and show the task body
   * 
   * @param {object} task The task object
   * @param {boolean} forceOpen true to force open the task (and not toggle it)
   */
  $scope.toggle = function(task, forceOpen) {
    // do not toggle when task is in edit mode
    if ($scope.isEdit(task)) {
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
  
  /**
   * Validate the form to make sure that there is only one task with each name
   */
  $scope.validate = function(form, task) {
    var duplicates = $scope.gulpfile.tasks.filter(function(value, index) {
      return value.name === task.name;
    });
    
    if (duplicates.length > 1) {
      $scope.error = 'There is already a task with name ' + task.name;
    } else {
      $log.debug('saving task ' + task.name);
      // validation is done.. Save task
      // TODO edit leaves us with a copy now... Maybe tasks should have an identifier too
      TaskService.addTask($routeParams.guid, task)
      .then(function(tasks) {
        $scope.gulpfile.tasks = tasks;
        $scope.edit();
      })
      .catch(function() {
        $scope.error = 'An error occured when trying to save task ' + task.name;
      });
      
    }
  };
  
  /**
   * Listen to ADD-TASK event. Add a new task to the current gulpfile 
   */
  $scope.$on('ADD-TASK', function(event, task) {
    if (!angular.isArray($scope.gulpfile.tasks)) {
      $scope.gulpfile.tasks = [];
    }
    $scope.gulpfile.tasks.push(task);
    $scope.toggle(task, true); // Force toggle to open the task
    $scope.edit(task);
  });
  
});