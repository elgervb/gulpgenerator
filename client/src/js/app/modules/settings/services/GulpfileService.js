/* global angular */
angular.module('gulpgenerator.settings').service('gulpfile', ($http, baseUrl) => {
  
  let load = () => {
    return $http.get({
      url: baseUrl
    });
  };
  
  return {
    load
  };
});
