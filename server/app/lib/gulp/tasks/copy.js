function() {
  return gulp.src( [ '{fields.src}' ] )
    .pipe( gulp.dest( '{fields.dest}' ) );
}