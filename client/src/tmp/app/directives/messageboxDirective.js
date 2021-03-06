/* global angular */
/**
 * ## Directive to show a message on screen ##
 * 
 * ### options ###
 * 
 * ***msg***: The (error) message to show to the user
 * ***title***: the optional title of the dialog. Defaults to 'Error'
 *
 * ### example ###
 * ```html
 * <messagebox title="'error'" msg="error"></messagebox>
 * ```
 */
angular.module('gulpgenerator').directive('messagebox', function messageboxDirective($document) {
  var ESCAPE_KEY = 27;
  
  return {
    restrict: 'E',
    scope: {
      msg: '=',
      title: '='
    },
    link: function(scope, element, attrs) {
      // Add some defaults, when needed...
      if (!scope.title) {
        scope.title = 'Error';
      }
      
      var closeDialog = function(e) {
        if (scope.msg && ESCAPE_KEY === e.keyCode) {
          scope.msg = '';
          scope.$apply();
        }
      };
      
      $document.on('keyup', closeDialog);
      
      scope.$on('$destroy', function() {
        $document.off('keyup', closeDialog);
      });
    
    },
    /* jshint multistr: true */
    /* The actual template */
    templateUrl: '/js/app/directives/messageboxDirective.html' 
  };
});
