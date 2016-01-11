/**
 * Download controller
 */
angular.module('gulpgenerator').controller('GeneratorController', function GeneratorController($scope, $routeParams, TaskService, BaseUrl) {

  /**
   * Fetch the gulpfile 
   */
  TaskService.getGulpfile($routeParams.guid).then(function(gulpfile) {
    $scope.gulpfile = gulpfile;
  });

  /**
   * Download the gulpfile by creating a iframe to the download url
   */
  $scope.download = function() {
    var iframe = document.createElement('iframe');
    iframe.classList.add('download-frame');
    iframe.src = BaseUrl + 'gulpfile/' + $routeParams.guid + '/download';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
});