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
        if (needle[keysNeedle[needleKey]] !== '' && haystack[keysHaystack[hayKey]] !== needle[keysNeedle[needleKey]]) {
          bSuccess = false;
        }
      } else {
        bSuccess = false;
      }
    }
    return bSuccess;
  }

  return {
    hayTest: _hayTest,
  }
}();
