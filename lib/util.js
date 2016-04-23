module.exports = function() {

  // Verify if the needle obj and it's values are in the haystack
  function _hayTest(needle, haystack) {
    var keysNeedle = Object.keys(needle);
    var keysHaystack = Object.keys(haystack);

    var bSuccess = true;
    for (needleKey in keysNeedle) {
      var hayKey = keysHaystack.indexOf(keysNeedle[needleKey]);

      // if each key is matched
      if (hayKey >= 0) {

        // verify the values of the keys match and are note ''. '' allows for wild.
        if (needle[keysNeedle[needleKey]] !== '' && haystack[keysHaystack[hayKey]] != needle[keysNeedle[needleKey]]) {
          bSuccess = false;
        }
      } else {
        bSuccess = false;
      }
    }

    return bSuccess;
  }

  function _debug(title, obj) {
    if (process.env.DEBUG) console.log('\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n', title, '\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n', obj, '\n===========================================\n\n');
  }

  function _hash(str, callback) {
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(str, salt, callback);
    });
  }

  // Usage
  // util.unhash('unhashed', cryptedData.hash, function(err, result){
  //   util.debug('Password Unhash Attempt', {dispName: cryptedData.dispName, result: result});
  // });

  function _unhash(pwdStr, hash, callback) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(pwdStr, hash, callback);
  }

  function _scrubData(dirtyData){
    var cleanData = dirtyData;
    return cleanData;
  }

  function _ifExists(obj, callback){
    if(typeof obj !== 'undefined') {
      callback();
    }
  }
  return {
    hayTest: _hayTest,
    debug: _debug,
    hash: _hash,
    unhash: _unhash,
    scrubData: _scrubData,
    ifExists: _ifExists
  }
}();
