const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');
const env = require('gulp-env');
const pkgInfo = require('./package.json');
const bump = require('./bump.js');
const fs = require('fs');
const util = require('apex-util');

// Task to initiate JSdocs
gulp.task('genDocs', shell.task(['jsdoc src -r -c ./conf.json -d ./build/jsdocs']));

gulp.task('bump', () => {
  pkgInfo.version = bump.version(pkgInfo.version, 'patch');

  fs.writeFile('./package.json', JSON.stringify(pkgInfo, null, 2), (err) => {
    if (err) {
      return util.debug('Saving Package.Json Error', err);
    }
    return util.debug('The file was saved!', true);
  });
});

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
