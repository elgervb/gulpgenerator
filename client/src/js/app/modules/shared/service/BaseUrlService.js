/* global angular */
/**
 * Angular factory to create the base url of the application, based on local or server configuration
 */
angular.module('gulpgenerator.shared').service('baseUrl', ($location) => {
  let host = $location.host();
  // Check for local
  if (host === 'localhost' || host.substr(0, 6) === '127.0.' || host.substr(0, 7) === '192.168') {
    return `${location.protocol}//${location.host}/`;
  }
  return '/';
});
