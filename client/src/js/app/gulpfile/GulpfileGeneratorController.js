/**
 * Main controller
 */
app.controller('GulpfileGeneratorController', function($scope, $routeParams, $http, TaskService, SharedData, BaseUrl) {

  $scope.package = SharedData.load($routeParams.guid);

  $scope.download = function() {
    
    var iframe = document.createElement('iframe');
    iframe.classList.add('download-frame');
    iframe.src = BaseUrl + 'gulpfile/' + $routeParams.guid + "/download";
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
});