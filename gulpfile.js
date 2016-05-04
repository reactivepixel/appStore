var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
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
