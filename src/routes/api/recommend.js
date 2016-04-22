/**
 * @var {module} buckets
 * @function require
 * @param filename
 * This needs the selected file.
*/

var g = require('ger');
var esm = new g.MemESM();//Event Store Manager
var ger = new g.GER(esm);//Good Enough Recommender----Added to package.json


var buckets=require('../../models/recommend');

buckets();
