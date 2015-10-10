/* global angular */
/**
 * Main controller
 */
app.controller('GulpfileController', function($scope,  $routeParams, TaskService, SharedData) {

  TaskService.getGulpfile($routeParams.guid).then(function(gulpfile){
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

    if (!$scope.predefinedTasks) {
      TaskService.getPredefinedTasks().then(function(response) {
        $scope.predefinedTasks = response.data.tasks;
      });
    }
  };
  
  /**
   * Delete a task from the list
   */
  $scope.delete = function(task){
    $scope.gulpfile.tasks = $scope.gulpfile.tasks.filter(function(value, index) {
      return value.type !== task.type && value.name !== task.name;
    });
  };

  /**
   * Select a predifined task and copy it to the gulpfile
   */
  $scope.select = function(task) {

    task = angular.copy(task);

    // Add task
    TaskService.addTask($scope.gulpfile, task)
    .then(function(tasks) { // New task will be returned in response.dat
    $scope.gulpfile.tasks = tasks;
      $scope.toggle(task, true); // Force toggle to open the task
      $scope.scope.editmode = true;
      $scope.showAdd = false;
    }, function(data, status, headers, config) {
      $scope.error = 'Looks like there was a network error. Please check your internet connection and try again later.';
    })
    .catch(function() {
      $scope.error = 'An error occured.';
    });

   
  };

});