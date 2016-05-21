const util = require('apex-util');

exports.version = (semVer, bumpType) => {
  const releases = semVer.split('.');
  const bumpOptions = {
    major: 0,
    minor: 1,
    patch: 2,
  };

  releases[bumpOptions[bumpType]] = Number(
    releases[bumpOptions[bumpType]]
  ) + 1;

  const bumpedSemVer = releases.join('.');
  util.debug('Output Version', bumpedSemVer);
  return bumpedSemVer;
};
