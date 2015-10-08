app.service('TaskService', function($http, BaseUrl, $q, $log) {

  var addTask = function(gulpfile, task) {
    return $http.put(BaseUrl + 'gulpfile/' + gulpfile.guid + "/tasks", task);
  },
  createGulpfile = function(gulpfile){
    $log.debug('adding new gulpfile');
    
    return $http.post(BaseUrl + 'gulpfile', gulpfile)
    .then(function(response, status, headers, config) {
      var deferred = $q.defer();
      
      if (response.status === 201) { // Created
        $log.debug('added new gulpfile ', response.data);
        deferred.resolve(response.data);
      } else { 
        deferred.reject(response.data, status, headers, config);
      }
      return deferred.promise;
    });
  },
  getGulpfile = function(guid){
    return $http({
      method: 'get',
      url: BaseUrl + 'gulpfile/' + guid
    }).then(function(response, status, headers, config){
      var deferred = $q.defer();
      
      if (response.status === 200) { // Created
        $log.debug('added new gulpfile ', response.data);
        deferred.resolve(response.data);
      } else { 
        deferred.reject(response.data, status, headers, config);
      }
      return deferred.promise;
    });
  },
  getPredefinedTasks = function() {
    return $http({
      method: 'get',
      url: BaseUrl + 'predefinedtasks'
    });
  };

  return {
    addTask: addTask,
    createGulpfile: createGulpfile,
    getGulpfile: getGulpfile,
    getPredefinedTasks: getPredefinedTasks
  }

});