const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');
const env = require('gulp-env');

// Task to initiate JSdocs
gulp.task('genDocs', shell.task(['jsdoc src -r -c ./conf.json -d ./build/jsdocs']));

// Task to run server using gulp
gulp.task('server', () => {
  env({
    file: '.env.json',
    vars: {
      // any variables you want to overwrite
    },
  });
  nodemon({
    script: './src/server.js',
  });
});

// Task to run server using gulp
gulp.task('dev', () => {
  env({
    file: '.env.json',
    vars: {
      DEBUG: true,
    },
  });
  nodemon({
    script: './src/server.js',
  });
});

gulp.task('default', ['server']);
