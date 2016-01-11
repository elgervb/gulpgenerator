/* global angular */
angular.module('gulpgenerator').service('TaskService', function($http, BaseUrl, $q, $log) {

  var addTask = function(guid, task) {
    return $http.put(BaseUrl + 'gulpfile/' + guid + '/tasks', task)
    .then(function(response) {
      return response.data;
    });
  },
  createGulpfile = function(gulpfile) {
    return $http.post(BaseUrl + 'gulpfile', gulpfile)
    .then(function(response, status, headers, config) {
      if (response.status === 201) { // Created
        $log.debug('added new gulpfile ', response.data);
        return response.data;
      } else { 
        var deferred = $q.defer();
        deferred.reject(response.data, status, headers, config);
        return deferred.promise;
      }
    });
  },
  deleteTask = function(guid, task) {
    return $http.delete(BaseUrl + 'gulpfile/' + guid + '/tasks/' + task.name, task)
    .then(function(response) {
      return response.data;
    });
  },
  getGulpfile = function(guid) {
    return $http({
      method: 'get',
      url: BaseUrl + 'gulpfile/' + guid
    }).then(function(response, status, headers, config) {
      if (response.status === 200) { // Created
        $log.debug('Get gulpfile ', response.data);
        return response.data;
      } else { 
        var deferred = $q.defer();
        deferred.reject(response.data, status, headers, config);
        return deferred.promise;
      }
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
    deleteTask: deleteTask,
    getGulpfile: getGulpfile,
    getPredefinedTasks: getPredefinedTasks
  }

});