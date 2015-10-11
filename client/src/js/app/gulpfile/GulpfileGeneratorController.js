/**
 * Download controller
 */
app.controller('GulpfileGeneratorController', function GulpfileGeneratorController($scope, $routeParams, TaskService, BaseUrl) {

  /**
   * Fetch the gulpfile 
   */
  TaskService.getGulpfile($routeParams.guid).then(function(gulpfile){
    $scope.gulpfile = gulpfile;
  });

  /**
   * Download the gulpfile
   */
  $scope.download = function() {
    var iframe = document.createElement('iframe');
    iframe.classList.add('download-frame');
    iframe.src = BaseUrl + 'gulpfile/' + $routeParams.guid + "/download";
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
});