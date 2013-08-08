/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['message.js']) {
  _$jscoverage['message.js'] = [];
  _$jscoverage['message.js'][6] = 0;
  _$jscoverage['message.js'][12] = 0;
  _$jscoverage['message.js'][24] = 0;
  _$jscoverage['message.js'][25] = 0;
  _$jscoverage['message.js'][26] = 0;
  _$jscoverage['message.js'][27] = 0;
  _$jscoverage['message.js'][39] = 0;
  _$jscoverage['message.js'][40] = 0;
  _$jscoverage['message.js'][41] = 0;
  _$jscoverage['message.js'][42] = 0;
  _$jscoverage['message.js'][43] = 0;
  _$jscoverage['message.js'][54] = 0;
  _$jscoverage['message.js'][55] = 0;
  _$jscoverage['message.js'][57] = 0;
  _$jscoverage['message.js'][58] = 0;
  _$jscoverage['message.js'][59] = 0;
  _$jscoverage['message.js'][61] = 0;
  _$jscoverage['message.js'][62] = 0;
  _$jscoverage['message.js'][63] = 0;
  _$jscoverage['message.js'][64] = 0;
  _$jscoverage['message.js'][67] = 0;
  _$jscoverage['message.js'][81] = 0;
  _$jscoverage['message.js'][82] = 0;
  _$jscoverage['message.js'][83] = 0;
  _$jscoverage['message.js'][86] = 0;
  _$jscoverage['message.js'][89] = 0;
  _$jscoverage['message.js'][92] = 0;
  _$jscoverage['message.js'][94] = 0;
}
_$jscoverage['message.js'][6]++;
var codecs = require("./codecs");
_$jscoverage['message.js'][12]++;
exports = module.exports = Message;
_$jscoverage['message.js'][24]++;
function Message(data, meta) {
  _$jscoverage['message.js'][25]++;
  this.parts = [];
  _$jscoverage['message.js'][26]++;
  this.byteLength = 0;
  _$jscoverage['message.js'][27]++;
  if (data) {
    _$jscoverage['message.js'][27]++;
    this.write(data, meta);
  }
}
_$jscoverage['message.js'][39]++;
Message.prototype.write = (function (data, meta) {
  _$jscoverage['message.js'][40]++;
  var buf = this.pack(data, meta == null? 1: meta);
  _$jscoverage['message.js'][41]++;
  this.byteLength += buf.length;
  _$jscoverage['message.js'][42]++;
  this.parts.push(buf);
  _$jscoverage['message.js'][43]++;
  return this;
});
_$jscoverage['message.js'][54]++;
Message.prototype.toBuffer = (function () {
  _$jscoverage['message.js'][55]++;
  if (this.parts.length === 1) {
    _$jscoverage['message.js'][55]++;
    return this.parts[0];
  }
  _$jscoverage['message.js'][57]++;
  var buf = new Buffer(this.byteLength);
  _$jscoverage['message.js'][58]++;
  var off = 0;
  _$jscoverage['message.js'][59]++;
  var msg;
  _$jscoverage['message.js'][61]++;
  for (var i = 0; i < this.parts.length; i++) {
    _$jscoverage['message.js'][62]++;
    msg = this.parts[i];
    _$jscoverage['message.js'][63]++;
    msg.copy(buf, off, 0, msg.length);
    _$jscoverage['message.js'][64]++;
    off += msg.length;
}
  _$jscoverage['message.js'][67]++;
  return this.pack(buf, 0);
});
_$jscoverage['message.js'][81]++;
Message.prototype.pack = (function (msg, meta) {
  _$jscoverage['message.js'][82]++;
  if ("string" == typeof msg) {
    _$jscoverage['message.js'][82]++;
    msg = new Buffer(msg);
  }
  _$jscoverage['message.js'][83]++;
  var buf = new Buffer(msg.length + 4);
  _$jscoverage['message.js'][86]++;
  buf.writeUInt32BE(msg.length, 0);
  _$jscoverage['message.js'][89]++;
  buf[0] = meta;
  _$jscoverage['message.js'][92]++;
  msg.copy(buf, 4);
  _$jscoverage['message.js'][94]++;
  return buf;
});
_$jscoverage['message.js'].source = ["","/**"," * Module dependencies."," */","","var codecs = require('./codecs');","","/**"," * Expose `Message`."," */","","exports = module.exports = Message;","","/**"," * Initialize a new `Message`."," *"," * The \"Message\" encapsulates packing messages and"," * maintaining state between multiple writes in the"," * case of multipart messages."," *"," * @api private"," */","","function Message(data, meta){","  this.parts = [];","  this.byteLength = 0;","  if (data) this.write(data, meta);","}","","/**"," * Appends a new message to the buffer."," *"," * @param {String|Buffer} data"," * @param {Mixed} meta"," * @return {Message}"," * @api private"," */","","Message.prototype.write = function(data, meta){","  var buf = this.pack(data, meta == null ? 1 : meta);","  this.byteLength += buf.length;","  this.parts.push(buf);","  return this;","};","","/**"," * Returns buffer of the single message or a new"," * buffer containtain all written messages (multipart)."," *"," * @return {Buffer}"," * @api private"," */","","Message.prototype.toBuffer = function(){","  if (this.parts.length === 1) return this.parts[0];","","  var buf = new Buffer(this.byteLength);","  var off = 0;","  var msg;","","  for (var i = 0; i &lt; this.parts.length; i++) {","    msg = this.parts[i];","    msg.copy(buf, off, 0, msg.length);","    off += msg.length;","  }","","  return this.pack(buf, 0);","};","","/**"," * Pack `msg`."," *"," * TODO: zero-copy"," *"," * @param {String|Buffer} msg"," * @param {Number} meta"," * @return {Buffer}"," * @api private"," */","","Message.prototype.pack = function(msg, meta){","  if ('string' == typeof msg) msg = new Buffer(msg);","  var buf = new Buffer(msg.length + 4);","","  // length","  buf.writeUInt32BE(msg.length, 0);","","  // meta","  buf[0] = meta;","","  // data","  msg.copy(buf, 4);","","  return buf;","};"];
