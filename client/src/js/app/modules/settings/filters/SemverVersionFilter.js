/* global angular */
/**
 * Takes an object with properties: major, minor, patch and transforms it into a string. 
 * If the version supplied is not an object, then the input will be returned
 */
angular.module('gulpgenerator.settings').filter('semver', () => {
  return function(version) {
    if (typeof version === 'object') {
      return `${version.major}.${version.minor}.${version.patch}`;
    }

    return version;
  };
});
