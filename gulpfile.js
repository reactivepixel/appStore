var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');
var env = require('gulp-env');

//Task to initiate JSdocs
gulp.task('genDocs', shell.task(['jsdoc src -r -c ./conf.json -d ./build/jsdocs']));

// Task to run server using gulp
gulp.task('server', function () {
  env({
    file: '.env.json',
    vars: {
      // any variables you want to overwrite
    }
  });
  nodemon({
    script: './src/server.js'
  });
});

// Task to run server using gulp
gulp.task('dev', function () {
  env({
    file: '.env.json',
    vars: {
      DEBUG: true
    }
  });
  nodemon({
    script: './src/server.js'
  });
});

gulp.task('default', ['server']);
