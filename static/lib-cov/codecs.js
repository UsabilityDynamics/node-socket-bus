/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['codecs.js']) {
  _$jscoverage['codecs.js'] = [];
  _$jscoverage['codecs.js'][6] = 0;
  _$jscoverage['codecs.js'][12] = 0;
  _$jscoverage['codecs.js'][18] = 0;
  _$jscoverage['codecs.js'][28] = 0;
  _$jscoverage['codecs.js'][29] = 0;
  _$jscoverage['codecs.js'][30] = 0;
  _$jscoverage['codecs.js'][31] = 0;
  _$jscoverage['codecs.js'][32] = 0;
  _$jscoverage['codecs.js'][34] = 0;
  _$jscoverage['codecs.js'][41] = 0;
  _$jscoverage['codecs.js'][52] = 0;
  _$jscoverage['codecs.js'][53] = 0;
  _$jscoverage['codecs.js'][64] = 0;
  _$jscoverage['codecs.js'][65] = 0;
  _$jscoverage['codecs.js'][72] = 0;
  _$jscoverage['codecs.js'][73] = 0;
  _$jscoverage['codecs.js'][74] = 0;
  _$jscoverage['codecs.js'][81] = 0;
}
_$jscoverage['codecs.js'][6]++;
var id = 1;
_$jscoverage['codecs.js'][12]++;
var max = 9;
_$jscoverage['codecs.js'][18]++;
var names = {};
_$jscoverage['codecs.js'][28]++;
exports.define = (function (name, fns) {
  _$jscoverage['codecs.js'][29]++;
  if ("string" != typeof name) {
    _$jscoverage['codecs.js'][29]++;
    throw new Error("codec name required");
  }
  _$jscoverage['codecs.js'][30]++;
  if ("function" != typeof fns.encode) {
    _$jscoverage['codecs.js'][30]++;
    throw new Error("codec .encode required");
  }
  _$jscoverage['codecs.js'][31]++;
  if ("function" != typeof fns.decode) {
    _$jscoverage['codecs.js'][31]++;
    throw new Error("codec .decode required");
  }
  _$jscoverage['codecs.js'][32]++;
  if (id === max) {
    _$jscoverage['codecs.js'][32]++;
    throw new Error("too many codecs");
  }
  _$jscoverage['codecs.js'][34]++;
  exports[name] = {encode: fns.encode, decode: fns.decode, name: name, id: id++};
  _$jscoverage['codecs.js'][41]++;
  names[exports[name].id] = name;
});
_$jscoverage['codecs.js'][52]++;
exports.byId = (function (id) {
  _$jscoverage['codecs.js'][53]++;
  return exports[names[id]];
});
_$jscoverage['codecs.js'][64]++;
exports.byName = (function (name) {
  _$jscoverage['codecs.js'][65]++;
  return exports[name];
});
_$jscoverage['codecs.js'][72]++;
exports.define("none", {encode: (function (msg) {
  _$jscoverage['codecs.js'][73]++;
  return msg;
}), decode: (function (msg) {
  _$jscoverage['codecs.js'][74]++;
  return msg;
})});
_$jscoverage['codecs.js'][81]++;
exports.define("json", {encode: JSON.stringify, decode: JSON.parse});
_$jscoverage['codecs.js'].source = ["","/**"," * Current id."," */","","var id = 1;","","/**"," * Max codecs."," */","","var max = 9;","","/**"," * Name map."," */","","var names = {};","","/**"," * Define codec `name` with encode and decode functions."," *"," * @param {String} name"," * @param {Object} fns"," * @api public"," */","","exports.define = function(name, fns){","  if ('string' != typeof name) throw new Error('codec name required');","  if ('function' != typeof fns.encode) throw new Error('codec .encode required');","  if ('function' != typeof fns.decode) throw new Error('codec .decode required');","  if (id === max) throw new Error('too many codecs');","","  exports[name] = {","    encode: fns.encode,","    decode: fns.decode,","    name: name,","    id: id++","  };","","  names[exports[name].id] = name;","};","","/**"," * Get codec by `id`."," *"," * @param {Number} id"," * @return {Object}"," * @api public"," */","","exports.byId = function(id){","  return exports[names[id]];","};","","/**"," * Get codec by `name`."," *"," * @param {String} name"," * @return {Object}"," * @api public"," */","","exports.byName = function(name){","  return exports[name];","};","","/**"," * Binary."," */","","exports.define('none', {","  encode: function(msg){ return msg },","  decode: function(msg){ return msg }","});","","/**"," * JSON."," */","","exports.define('json', {","  encode: JSON.stringify,","  decode: JSON.parse","});"];
