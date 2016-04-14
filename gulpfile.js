var gulp = require('gulp'),
nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');


gulp.task('js-doc', shell.task(['jsdoc src/server.js']));

gulp.task('default', ['dev','js-doc'], function() {
  console.log("Moving all files for jsdoc ");
  gulp.src("./out/*")
  .pipe(gulp.dest('src/routes/out'));
});

gulp.task('dev', function () {
  nodemon({
    script: './src/server.js'
  })
})
