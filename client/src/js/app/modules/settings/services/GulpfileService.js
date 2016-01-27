/* global angular */
angular.module('gulpfile.settings').service('gulpfile', ($http) => {
  
  let load = () => {
    return $http.get({
      url: 'http://localhost:4011/'
    });
  };
  
  return {
    load
  };
});
