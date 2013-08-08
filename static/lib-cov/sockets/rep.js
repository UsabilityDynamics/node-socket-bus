/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['sockets/rep.js']) {
  _$jscoverage['sockets/rep.js'] = [];
  _$jscoverage['sockets/rep.js'][6] = 0;
  _$jscoverage['sockets/rep.js'][13] = 0;
  _$jscoverage['sockets/rep.js'][21] = 0;
  _$jscoverage['sockets/rep.js'][22] = 0;
  _$jscoverage['sockets/rep.js'][29] = 0;
  _$jscoverage['sockets/rep.js'][39] = 0;
  _$jscoverage['sockets/rep.js'][40] = 0;
  _$jscoverage['sockets/rep.js'][41] = 0;
  _$jscoverage['sockets/rep.js'][42] = 0;
  _$jscoverage['sockets/rep.js'][44] = 0;
  _$jscoverage['sockets/rep.js'][45] = 0;
  _$jscoverage['sockets/rep.js'][46] = 0;
  _$jscoverage['sockets/rep.js'][47] = 0;
  _$jscoverage['sockets/rep.js'][49] = 0;
  _$jscoverage['sockets/rep.js'][50] = 0;
  _$jscoverage['sockets/rep.js'][51] = 0;
  _$jscoverage['sockets/rep.js'][52] = 0;
  _$jscoverage['sockets/rep.js'][54] = 0;
  _$jscoverage['sockets/rep.js'][55] = 0;
  _$jscoverage['sockets/rep.js'][57] = 0;
  _$jscoverage['sockets/rep.js'][59] = 0;
  _$jscoverage['sockets/rep.js'][60] = 0;
  _$jscoverage['sockets/rep.js'][61] = 0;
  _$jscoverage['sockets/rep.js'][63] = 0;
  _$jscoverage['sockets/rep.js'][64] = 0;
  _$jscoverage['sockets/rep.js'][65] = 0;
}
_$jscoverage['sockets/rep.js'][6]++;
var Socket = require("./sock"), debug = require("debug")("axon:rep");
_$jscoverage['sockets/rep.js'][13]++;
module.exports = RepSocket;
_$jscoverage['sockets/rep.js'][21]++;
function RepSocket() {
  _$jscoverage['sockets/rep.js'][22]++;
  Socket.call(this);
}
_$jscoverage['sockets/rep.js'][29]++;
RepSocket.prototype.__proto__ = Socket.prototype;
_$jscoverage['sockets/rep.js'][39]++;
RepSocket.prototype.onmessage = (function (sock) {
  _$jscoverage['sockets/rep.js'][40]++;
  var self = this;
  _$jscoverage['sockets/rep.js'][41]++;
  return (function (msg, multipart) {
  _$jscoverage['sockets/rep.js'][42]++;
  if (! multipart) {
    _$jscoverage['sockets/rep.js'][42]++;
    return debug("expected multipart: %j", msg);
  }
  _$jscoverage['sockets/rep.js'][44]++;
  var id = msg.pop();
  _$jscoverage['sockets/rep.js'][45]++;
  msg.unshift("message");
  _$jscoverage['sockets/rep.js'][46]++;
  msg.push(reply);
  _$jscoverage['sockets/rep.js'][47]++;
  self.emit.apply(self, msg);
  _$jscoverage['sockets/rep.js'][49]++;
  function reply() {
    _$jscoverage['sockets/rep.js'][50]++;
    var fn = (function () {
});
    _$jscoverage['sockets/rep.js'][51]++;
    var args = [].slice.call(arguments);
    _$jscoverage['sockets/rep.js'][52]++;
    args[0] = args[0] || null;
    _$jscoverage['sockets/rep.js'][54]++;
    var hasCallback = "function" == typeof args[args.length - 1];
    _$jscoverage['sockets/rep.js'][55]++;
    if (hasCallback) {
      _$jscoverage['sockets/rep.js'][55]++;
      fn = args.pop();
    }
    _$jscoverage['sockets/rep.js'][57]++;
    args.push(id);
    _$jscoverage['sockets/rep.js'][59]++;
    if (sock.writable) {
      _$jscoverage['sockets/rep.js'][60]++;
      sock.write(self.pack(args), (function () {
  _$jscoverage['sockets/rep.js'][60]++;
  fn(true);
}));
      _$jscoverage['sockets/rep.js'][61]++;
      return true;
    }
    else {
      _$jscoverage['sockets/rep.js'][63]++;
      debug("peer went away");
      _$jscoverage['sockets/rep.js'][64]++;
      process.nextTick((function () {
  _$jscoverage['sockets/rep.js'][64]++;
  fn(false);
}));
      _$jscoverage['sockets/rep.js'][65]++;
      return false;
    }
}
});
});
_$jscoverage['sockets/rep.js'].source = ["","/**"," * Module dependencies."," */","","var Socket = require('./sock')","  , debug = require('debug')('axon:rep');","","/**"," * Expose `RepSocket`."," */","","module.exports = RepSocket;","","/**"," * Initialize a new `RepSocket`."," *"," * @api private"," */","","function RepSocket() {","  Socket.call(this);","}","","/**"," * Inherits from `Socket.prototype`."," */","","RepSocket.prototype.__proto__ = Socket.prototype;","","/**"," * Incoming."," *"," * @param {net.Socket} sock"," * @return {Function} closure(msg, mulitpart)"," * @api private"," */","","RepSocket.prototype.onmessage = function(sock){","  var self = this;","  return function (msg, multipart){","    if (!multipart) return debug('expected multipart: %j', msg);","","    var id = msg.pop();","    msg.unshift('message');","    msg.push(reply);","    self.emit.apply(self, msg);","","    function reply() {","      var fn = function(){};","      var args = [].slice.call(arguments);","      args[0] = args[0] || null;","","      var hasCallback = 'function' == typeof args[args.length - 1];","      if (hasCallback) fn = args.pop();","","      args.push(id);","","      if (sock.writable) {","        sock.write(self.pack(args), function(){ fn(true) });","        return true;","      } else {","        debug('peer went away');","        process.nextTick(function(){ fn(false) });","        return false;","      }","    }","  };","};","",""];
