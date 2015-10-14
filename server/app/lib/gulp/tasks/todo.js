function() {
  var todo = require('gulp-todo'),
  plumber = require('gulp-plumber');
  
  gulp.src( [ '{fields.src}' ] )
    .pipe( plumber() )
    .pipe( todo() )
    .pipe( gulp.dest( '{fields.dest}' ) )
    .pipe( todo.reporter('json', {fileName: 'todo.json'} ) )
    .pipe( gulp.dest( '{fields.dest}' ) ) 
}