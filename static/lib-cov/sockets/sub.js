/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['sockets/sub.js']) {
  _$jscoverage['sockets/sub.js'] = [];
  _$jscoverage['sockets/sub.js'][6] = 0;
  _$jscoverage['sockets/sub.js'][14] = 0;
  _$jscoverage['sockets/sub.js'][22] = 0;
  _$jscoverage['sockets/sub.js'][23] = 0;
  _$jscoverage['sockets/sub.js'][24] = 0;
  _$jscoverage['sockets/sub.js'][31] = 0;
  _$jscoverage['sockets/sub.js'][40] = 0;
  _$jscoverage['sockets/sub.js'][41] = 0;
  _$jscoverage['sockets/sub.js'][52] = 0;
  _$jscoverage['sockets/sub.js'][53] = 0;
  _$jscoverage['sockets/sub.js'][54] = 0;
  _$jscoverage['sockets/sub.js'][55] = 0;
  _$jscoverage['sockets/sub.js'][58] = 0;
  _$jscoverage['sockets/sub.js'][69] = 0;
  _$jscoverage['sockets/sub.js'][70] = 0;
  _$jscoverage['sockets/sub.js'][71] = 0;
  _$jscoverage['sockets/sub.js'][73] = 0;
  _$jscoverage['sockets/sub.js'][74] = 0;
  _$jscoverage['sockets/sub.js'][75] = 0;
  _$jscoverage['sockets/sub.js'][79] = 0;
  _$jscoverage['sockets/sub.js'][80] = 0;
  _$jscoverage['sockets/sub.js'][84] = 0;
  _$jscoverage['sockets/sub.js'][95] = 0;
  _$jscoverage['sockets/sub.js'][96] = 0;
  _$jscoverage['sockets/sub.js'][97] = 0;
  _$jscoverage['sockets/sub.js'][98] = 0;
  _$jscoverage['sockets/sub.js'][107] = 0;
  _$jscoverage['sockets/sub.js'][108] = 0;
  _$jscoverage['sockets/sub.js'][115] = 0;
  _$jscoverage['sockets/sub.js'][116] = 0;
  _$jscoverage['sockets/sub.js'][127] = 0;
  _$jscoverage['sockets/sub.js'][128] = 0;
  _$jscoverage['sockets/sub.js'][129] = 0;
  _$jscoverage['sockets/sub.js'][130] = 0;
  _$jscoverage['sockets/sub.js'][131] = 0;
}
_$jscoverage['sockets/sub.js'][6]++;
var Socket = require("./sock"), debug = require("debug")("axon:sub"), escape = require("escape-regexp");
_$jscoverage['sockets/sub.js'][14]++;
module.exports = SubSocket;
_$jscoverage['sockets/sub.js'][22]++;
function SubSocket() {
  _$jscoverage['sockets/sub.js'][23]++;
  Socket.call(this);
  _$jscoverage['sockets/sub.js'][24]++;
  this.subscriptions = [];
}
_$jscoverage['sockets/sub.js'][31]++;
SubSocket.prototype.__proto__ = Socket.prototype;
_$jscoverage['sockets/sub.js'][40]++;
SubSocket.prototype.hasSubscriptions = (function () {
  _$jscoverage['sockets/sub.js'][41]++;
  return ! ! this.subscriptions.length;
});
_$jscoverage['sockets/sub.js'][52]++;
SubSocket.prototype.matches = (function (topic) {
  _$jscoverage['sockets/sub.js'][53]++;
  for (var i = 0; i < this.subscriptions.length; ++i) {
    _$jscoverage['sockets/sub.js'][54]++;
    if (this.subscriptions[i].test(topic)) {
      _$jscoverage['sockets/sub.js'][55]++;
      return true;
    }
}
  _$jscoverage['sockets/sub.js'][58]++;
  return false;
});
_$jscoverage['sockets/sub.js'][69]++;
SubSocket.prototype.onmessage = (function (sock) {
  _$jscoverage['sockets/sub.js'][70]++;
  var self = this;
  _$jscoverage['sockets/sub.js'][71]++;
  var patterns = this.subscriptions;
  _$jscoverage['sockets/sub.js'][73]++;
  if (this.hasSubscriptions()) {
    _$jscoverage['sockets/sub.js'][74]++;
    return (function (msg, multipart) {
  _$jscoverage['sockets/sub.js'][75]++;
  var topic = multipart? msg[0].toString(): msg.toString();
  _$jscoverage['sockets/sub.js'][79]++;
  if (! self.matches(topic)) {
    _$jscoverage['sockets/sub.js'][79]++;
    return debug("not subscribed to \"%s\"", topic);
  }
  _$jscoverage['sockets/sub.js'][80]++;
  self.emit.apply(self, ["message"].concat(msg));
});
  }
  _$jscoverage['sockets/sub.js'][84]++;
  return Socket.prototype.onmessage.call(this, sock);
});
_$jscoverage['sockets/sub.js'][95]++;
SubSocket.prototype.subscribe = (function (re) {
  _$jscoverage['sockets/sub.js'][96]++;
  debug("subscribe to \"%s\"", re);
  _$jscoverage['sockets/sub.js'][97]++;
  this.subscriptions.push(re = toRegExp(re));
  _$jscoverage['sockets/sub.js'][98]++;
  return re;
});
_$jscoverage['sockets/sub.js'][107]++;
SubSocket.prototype.clearSubscriptions = (function () {
  _$jscoverage['sockets/sub.js'][108]++;
  this.subscriptions = [];
});
_$jscoverage['sockets/sub.js'][115]++;
SubSocket.prototype.send = (function () {
  _$jscoverage['sockets/sub.js'][116]++;
  throw new Error("subscribers cannot send messages");
});
_$jscoverage['sockets/sub.js'][127]++;
function toRegExp(str) {
  _$jscoverage['sockets/sub.js'][128]++;
  if (str instanceof RegExp) {
    _$jscoverage['sockets/sub.js'][128]++;
    return str;
  }
  _$jscoverage['sockets/sub.js'][129]++;
  str = escape(str);
  _$jscoverage['sockets/sub.js'][130]++;
  str = str.replace(/\\\*/g, "(.+)");
  _$jscoverage['sockets/sub.js'][131]++;
  return new RegExp("^" + str + "$");
}
_$jscoverage['sockets/sub.js'].source = ["","/**"," * Module dependencies."," */","","var Socket = require('./sock')","  , debug = require('debug')('axon:sub')","  , escape = require('escape-regexp');","","/**"," * Expose `SubSocket`."," */","","module.exports = SubSocket;","","/**"," * Initialize a new `SubSocket`."," *"," * @api private"," */","","function SubSocket() {","  Socket.call(this);","  this.subscriptions = [];","}","","/**"," * Inherits from `Socket.prototype`."," */","","SubSocket.prototype.__proto__ = Socket.prototype;","","/**"," * Check if this socket has subscriptions."," *"," * @return {Boolean}"," * @api public"," */","","SubSocket.prototype.hasSubscriptions = function(){","  return !! this.subscriptions.length;","};","","/**"," * Check if any subscriptions match `topic`."," *"," * @param {String} topic"," * @return {Boolean}"," * @api public"," */","","SubSocket.prototype.matches = function(topic){","  for (var i = 0; i &lt; this.subscriptions.length; ++i) {","    if (this.subscriptions[i].test(topic)) {","      return true;","    }","  }","  return false;","};","","/**"," * Message handler."," *"," * @param {net.Socket} sock"," * @return {Function} closure(msg, mulitpart)"," * @api private"," */","","SubSocket.prototype.onmessage = function(sock){","  var self = this;","  var patterns = this.subscriptions;","","  if (this.hasSubscriptions()) {","    return function(msg, multipart){","      var topic = multipart","        ? msg[0].toString()","        : msg.toString();","","      if (!self.matches(topic)) return debug('not subscribed to \"%s\"', topic);","      self.emit.apply(self, ['message'].concat(msg));","    }","  }","","  return Socket.prototype.onmessage.call(this, sock);","};","","/**"," * Subscribe with the given `re`."," *"," * @param {RegExp|String} re"," * @return {RegExp}"," * @api public"," */","","SubSocket.prototype.subscribe = function(re){","  debug('subscribe to \"%s\"', re);","  this.subscriptions.push(re = toRegExp(re));","  return re;","};","","/**"," * Clear current subscriptions."," *"," * @api public"," */","","SubSocket.prototype.clearSubscriptions = function(){","  this.subscriptions = [];","};","","/**"," * Subscribers should not send messages."," */","","SubSocket.prototype.send = function(){","  throw new Error('subscribers cannot send messages');","};","","/**"," * Convert `str` to a `RegExp`."," *"," * @param {String} str"," * @return {RegExp}"," * @api private"," */","","function toRegExp(str) {","  if (str instanceof RegExp) return str;","  str = escape(str);","  str = str.replace(/\\\\\\*/g, '(.+)');","  return new RegExp('^' + str + '$');","}"];