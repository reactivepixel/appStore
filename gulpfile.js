var gulp = require('gulp'),
nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

//Task to initiate JSdocs
gulp.task('js-doc', shell.task(['jsdoc src/**/**.*']));

// Task to move JSdoc 'out' folder to correct place
gulp.task('default', ['dev','js-doc'], function() {
  gulp.src("./out/**/**.*")
  .pipe(gulp.dest('build/JSdocs'));
});

//Task to run server using gulp
gulp.task('dev', function () {
  nodemon({
    script: './src/server.js'
  })
})
