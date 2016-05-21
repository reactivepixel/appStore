const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const shell = require('gulp-shell');
const env = require('gulp-env');
const pkgInfo = require('./package.json');
const bump = require('./bump.js');
const fs = require('fs');
const util = require('apex-util');
const git = require('gulp-git');
const argv = require('yargs').argv;

// Task to initiate JSdocs
gulp.task('genDocs', shell.task(['jsdoc src -r -c ./conf.json -d ./build/jsdocs']));

gulp.task('bump', () => {
  const semOption = Object.keys(argv)[1];
  if (['major', 'minor', 'patch'].indexOf(semOption) === -1) {
    return util.log('Error: No Argument Specificed');
  }
  pkgInfo.version = bump.version(pkgInfo.version, semOption);
  fs.writeFile('./package.json', JSON.stringify(pkgInfo, null, 2), (err) => {
    if (err) {
      return util.debug('Saving Package.Json Error', err);
    }
    util.debug('The file was saved!', true);
    const commitMsg = 'VERSION BUMP to ' + pkgInfo.version;

    gulp.src('./package.json')
      .pipe(git.add())
      .pipe(git.commit(commitMsg));
    git.tag('v' + pkgInfo.version, 'Version message', (taggingErr) => {
      if (taggingErr) throw taggingErr;
    });

    return true;
  });
  return false;
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
