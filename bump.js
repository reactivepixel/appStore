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

  if (bumpOptions[bumpType] < 2) {
    releases[bumpOptions[bumpType] + 1] = 0;
  }
  if (bumpOptions[bumpType] < 1) {
    releases[bumpOptions[bumpType] + 2] = 0;
  }

  const bumpedSemVer = releases.join('.');
  util.debug('Output Version', bumpedSemVer);
  return bumpedSemVer;
};
