/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['sockets/push.js']) {
  _$jscoverage['sockets/push.js'] = [];
  _$jscoverage['sockets/push.js'][6] = 0;
  _$jscoverage['sockets/push.js'][14] = 0;
  _$jscoverage['sockets/push.js'][22] = 0;
  _$jscoverage['sockets/push.js'][23] = 0;
  _$jscoverage['sockets/push.js'][24] = 0;
  _$jscoverage['sockets/push.js'][25] = 0;
  _$jscoverage['sockets/push.js'][32] = 0;
}
_$jscoverage['sockets/push.js'][6]++;
var Socket = require("./sock"), queue = require("../plugins/queue"), roundrobin = require("../plugins/round-robin");
_$jscoverage['sockets/push.js'][14]++;
module.exports = PushSocket;
_$jscoverage['sockets/push.js'][22]++;
function PushSocket() {
  _$jscoverage['sockets/push.js'][23]++;
  Socket.call(this);
  _$jscoverage['sockets/push.js'][24]++;
  this.use(queue());
  _$jscoverage['sockets/push.js'][25]++;
  this.use(roundrobin({fallback: this.enqueue}));
}
_$jscoverage['sockets/push.js'][32]++;
PushSocket.prototype.__proto__ = Socket.prototype;
_$jscoverage['sockets/push.js'].source = ["","/**"," * Module dependencies."," */","","var Socket = require('./sock')","  , queue = require('../plugins/queue')","  , roundrobin = require('../plugins/round-robin');","","/**"," * Expose `PushSocket`."," */","","module.exports = PushSocket;","","/**"," * Initialize a new `PushSocket`."," *"," * @api private"," */","","function PushSocket() {","  Socket.call(this);","  this.use(queue());","  this.use(roundrobin({ fallback: this.enqueue }));","}","","/**"," * Inherits from `Socket.prototype`."," */","","PushSocket.prototype.__proto__ = Socket.prototype;"];
