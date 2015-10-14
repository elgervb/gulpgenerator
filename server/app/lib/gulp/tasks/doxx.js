function(){
  var gulpDoxx = require('gulp-doxx');

  gulp.src( [ '{fields.src}' ] )
    .pipe(gulpDoxx({
    	{#fields.title}title: {fields.title}{/fields.title}{#fields.urlPrefix},
        urlPrefix: "file:///"+__dirname+{fields.urlPrefix}{/fields.urlPrefix}
    }))
    .pipe( gulp.dest( '{fields.dest}' ) );

}