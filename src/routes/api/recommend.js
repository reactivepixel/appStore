/**
 * @var {module} buckets
 * @function require
 * @param filename
 * This needs the selected file.
*/
var g = require('ger');
var esm = new g.MemESM();
var ger = new g.GER(esm);
var buckets=require('../../models/recommend');
var rec=require('../../models/rec');

console.log(buckets());
