var gulp = require('gulp'); // Sets gulp to imported file/module gulp
var nodemon = require('gulp-nodemon'); // Sets nodemon to imported file/module gulp-nodemon
var shell = require('gulp-shell'); // Sets shell to imported file/module gulp-shell

//Task to initiate JSdocs
gulp.task('js-doc', shell.task(['jsdoc src/server.js']));

// Task to move JSdoc 'out' folder to correct place
gulp.task('default', ['dev','js-doc'], function() {
  gulp.src("./out/*")
  .pipe(gulp.dest('src/routes/out'));
});

//Task to run server using gulp
gulp.task('dev', function () {
  nodemon({
    script: './src/server.js'
  })
})
