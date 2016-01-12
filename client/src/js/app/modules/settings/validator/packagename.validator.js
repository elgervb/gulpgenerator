/* global angular */
angular.module('gulpgenerator.settings').directive('packagename', () => {
  return {
    require: 'ngModel',
    link: (scope, elm, attrs, ctrl) => {
      ctrl.$validators.packagename = (modelValue, viewValue) => {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        // package name cannot start with a . or _
        if (viewValue.indexOf('.') === 0 || viewValue.indefOf('_') === 0) {
          return false;
        }
        
        // cannot contain uppercase
        if (/[A-Z]+/.test(viewValue)) {
          return false;
        }

        // it is valid
        return true;
      };
    }
  };
});