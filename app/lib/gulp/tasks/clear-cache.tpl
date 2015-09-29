
/**
 * Clears the cache used by gulp-cache
 */
gulp.task('{name}', function() {
	
	var cache = require('gulp-cache');
	
  // Or, just call this for everything
  cache.clearAll();
});