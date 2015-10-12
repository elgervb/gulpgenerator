/**
 * Angular factory to create the base url of the application, based on local or server configuration
 */
angular.module('gulpgenerator').factory('BaseUrl', function($location) {
  var host = $location.host();
  // Check for local
  if (host === 'localhost' || host.substr(0, 6) === '127.0.' || host.substr(0, 7) === '192.168') {
    return 'http://localhost:4010/';
  } else {
    return '/';
  } 
});
