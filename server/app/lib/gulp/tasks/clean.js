function(cb) {
  require('del')([ '{fields.path}' ], cb);
}