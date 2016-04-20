/**
 * @var {module} gulp
 * This is setting the gulp module to the variable, gulp.
*/
var gulp = require('gulp');

/**
 * @var {module} nodemon
 * This is setting the gulp-nodemon module to the variable, nodemon.
*/
var nodemon = require('gulp-nodemon');

/**
 * @var {module} shell
 * This is setting the gulp-shell module to the variable, shell.
*/
var shell = require('gulp-shell');

//Task to initiate JSdocs
gulp.task('js-doc', shell.task(['jsdoc src -r -c ./conf.json -d ./build/jsdocs']));

// Task to run server using gulp
gulp.task('server', function () {
  nodemon({
    script: './src/server.js'
  });
});

gulp.task('default', ['js-doc','server']);
