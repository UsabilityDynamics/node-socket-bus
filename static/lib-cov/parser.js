/* automatically generated by JSCoverage - do not edit */
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (! _$jscoverage['parser.js']) {
  _$jscoverage['parser.js'] = [];
  _$jscoverage['parser.js'][6] = 0;
  _$jscoverage['parser.js'][12] = 0;
  _$jscoverage['parser.js'][23] = 0;
  _$jscoverage['parser.js'][24] = 0;
  _$jscoverage['parser.js'][25] = 0;
  _$jscoverage['parser.js'][26] = 0;
  _$jscoverage['parser.js'][27] = 0;
  _$jscoverage['parser.js'][28] = 0;
  _$jscoverage['parser.js'][39] = 0;
  _$jscoverage['parser.js'][48] = 0;
  _$jscoverage['parser.js'][49] = 0;
  _$jscoverage['parser.js'][50] = 0;
  _$jscoverage['parser.js'][60] = 0;
  _$jscoverage['parser.js'][61] = 0;
  _$jscoverage['parser.js'][63] = 0;
  _$jscoverage['parser.js'][68] = 0;
  _$jscoverage['parser.js'][69] = 0;
  _$jscoverage['parser.js'][73] = 0;
  _$jscoverage['parser.js'][74] = 0;
  _$jscoverage['parser.js'][75] = 0;
  _$jscoverage['parser.js'][76] = 0;
  _$jscoverage['parser.js'][77] = 0;
  _$jscoverage['parser.js'][81] = 0;
  _$jscoverage['parser.js'][91] = 0;
  _$jscoverage['parser.js'][92] = 0;
  _$jscoverage['parser.js'][94] = 0;
  _$jscoverage['parser.js'][98] = 0;
  _$jscoverage['parser.js'][101] = 0;
  _$jscoverage['parser.js'][102] = 0;
  _$jscoverage['parser.js'][105] = 0;
  _$jscoverage['parser.js'][106] = 0;
  _$jscoverage['parser.js'][107] = 0;
  _$jscoverage['parser.js'][111] = 0;
  _$jscoverage['parser.js'][122] = 0;
  _$jscoverage['parser.js'][123] = 0;
  _$jscoverage['parser.js'][127] = 0;
  _$jscoverage['parser.js'][128] = 0;
  _$jscoverage['parser.js'][131] = 0;
  _$jscoverage['parser.js'][133] = 0;
  _$jscoverage['parser.js'][147] = 0;
  _$jscoverage['parser.js'][148] = 0;
  _$jscoverage['parser.js'][149] = 0;
  _$jscoverage['parser.js'][153] = 0;
  _$jscoverage['parser.js'][155] = 0;
  _$jscoverage['parser.js'][156] = 0;
  _$jscoverage['parser.js'][157] = 0;
  _$jscoverage['parser.js'][158] = 0;
  _$jscoverage['parser.js'][159] = 0;
  _$jscoverage['parser.js'][162] = 0;
  _$jscoverage['parser.js'][174] = 0;
  _$jscoverage['parser.js'][175] = 0;
  _$jscoverage['parser.js'][176] = 0;
  _$jscoverage['parser.js'][183] = 0;
  _$jscoverage['parser.js'][184] = 0;
  _$jscoverage['parser.js'][185] = 0;
  _$jscoverage['parser.js'][186] = 0;
  _$jscoverage['parser.js'][187] = 0;
}
_$jscoverage['parser.js'][6]++;
var codecs = require("./codecs");
_$jscoverage['parser.js'][12]++;
exports = module.exports = Parser;
_$jscoverage['parser.js'][23]++;
function Parser() {
  _$jscoverage['parser.js'][24]++;
  this.buf = new Buffer(4);
  _$jscoverage['parser.js'][25]++;
  this.i = 0;
  _$jscoverage['parser.js'][26]++;
  this.state = "header";
  _$jscoverage['parser.js'][27]++;
  this.headers = null;
  _$jscoverage['parser.js'][28]++;
  this.body = null;
}
_$jscoverage['parser.js'][39]++;
Parser.prototype.onmessage = (function (msg) {
});
_$jscoverage['parser.js'][48]++;
Parser.prototype.write = (function (chunk) {
  _$jscoverage['parser.js'][49]++;
  if ("header" == this.state) {
    _$jscoverage['parser.js'][49]++;
    this.frameHeader(chunk);
  }
  else {
    _$jscoverage['parser.js'][50]++;
    this.frameBody(chunk);
  }
});
_$jscoverage['parser.js'][60]++;
Parser.prototype.frameHeader = (function (chunk) {
  _$jscoverage['parser.js'][61]++;
  var remaining = 4 - this.i;
  _$jscoverage['parser.js'][63]++;
  var n = remaining > chunk.length? chunk.length: remaining;
  _$jscoverage['parser.js'][68]++;
  for (var i = 0; i < n; i++) {
    _$jscoverage['parser.js'][69]++;
    this.buf[this.i++] = chunk[i];
}
  _$jscoverage['parser.js'][73]++;
  if (4 === this.i) {
    _$jscoverage['parser.js'][74]++;
    this.state = "body";
    _$jscoverage['parser.js'][75]++;
    this.i = 0;
    _$jscoverage['parser.js'][76]++;
    this.headers = this.parseHeaders(this.buf);
    _$jscoverage['parser.js'][77]++;
    this.body = new Buffer(this.headers.length);
  }
  _$jscoverage['parser.js'][81]++;
  if (chunk.length - n) {
    _$jscoverage['parser.js'][81]++;
    this.write(chunk.slice(n));
  }
});
_$jscoverage['parser.js'][91]++;
Parser.prototype.frameBody = (function (chunk) {
  _$jscoverage['parser.js'][92]++;
  var remaining = this.headers.length - this.i;
  _$jscoverage['parser.js'][94]++;
  var n = remaining > chunk.length? chunk.length: remaining;
  _$jscoverage['parser.js'][98]++;
  var multipart = this.headers.meta === 0;
  _$jscoverage['parser.js'][101]++;
  chunk.copy(this.body, this.i, 0, n);
  _$jscoverage['parser.js'][102]++;
  this.i += n;
  _$jscoverage['parser.js'][105]++;
  if (this.headers.length === this.i) {
    _$jscoverage['parser.js'][106]++;
    this.onmessage(this.parseBody(this.body, this.headers), multipart);
    _$jscoverage['parser.js'][107]++;
    this.reset();
  }
  _$jscoverage['parser.js'][111]++;
  if (chunk.length - n) {
    _$jscoverage['parser.js'][111]++;
    this.write(chunk.slice(n));
  }
});
_$jscoverage['parser.js'][122]++;
Parser.prototype.parseHeaders = (function (buf) {
  _$jscoverage['parser.js'][123]++;
  var meta = buf[0], len = 0;
  _$jscoverage['parser.js'][127]++;
  buf[0] = 0;
  _$jscoverage['parser.js'][128]++;
  len = buf.readUInt32BE(0);
  _$jscoverage['parser.js'][131]++;
  buf[0] = meta;
  _$jscoverage['parser.js'][133]++;
  return ({length: len, meta: meta});
});
_$jscoverage['parser.js'][147]++;
Parser.prototype.parseBody = (function (body, headers) {
  _$jscoverage['parser.js'][148]++;
  var multipart = headers.meta === 0;
  _$jscoverage['parser.js'][149]++;
  var msgs = [], buf, header;
  _$jscoverage['parser.js'][153]++;
  if (! multipart) {
    _$jscoverage['parser.js'][153]++;
    return this.decode(body, headers.meta);
  }
  _$jscoverage['parser.js'][155]++;
  for (var i = 0; i < body.length;) {
    _$jscoverage['parser.js'][156]++;
    header = this.parseHeaders(body.slice(i, i + 4));
    _$jscoverage['parser.js'][157]++;
    buf = body.slice(i + 4, i + header.length + 4);
    _$jscoverage['parser.js'][158]++;
    msgs.push(this.decode(buf, header.meta));
    _$jscoverage['parser.js'][159]++;
    i += header.length + 4;
}
  _$jscoverage['parser.js'][162]++;
  return msgs;
});
_$jscoverage['parser.js'][174]++;
Parser.prototype.decode = (function (msg, type) {
  _$jscoverage['parser.js'][175]++;
  var codec = codecs.byId(type);
  _$jscoverage['parser.js'][176]++;
  return codec.decode(msg);
});
_$jscoverage['parser.js'][183]++;
Parser.prototype.reset = (function () {
  _$jscoverage['parser.js'][184]++;
  this.state = "header";
  _$jscoverage['parser.js'][185]++;
  this.i = 0;
  _$jscoverage['parser.js'][186]++;
  this.headers = null;
  _$jscoverage['parser.js'][187]++;
  this.body = null;
});
_$jscoverage['parser.js'].source = ["","/**"," * Module dependencies."," */","","var codecs = require('./codecs');","","/**"," * Expose `Parser`."," */","","exports = module.exports = Parser;","","/**"," * Initialize a new `Parser`."," *"," * The \"Parser\" encapsulates message framing and"," * applying of codecs for each message received."," *"," * @api private"," */","","function Parser(){","  this.buf = new Buffer(4);","  this.i = 0;","  this.state = 'header';","  this.headers = null;","  this.body = null;","}","","/**"," * Temporary stub. Calling context should impement this"," * in order to receive the parsed message(s)."," *"," * @param {Mixed} message"," * @api private"," */","","Parser.prototype.onmessage = function(msg){};","","/**"," * Frame the given `chunk`."," *"," * @param {Buffer} chunk"," * @api private"," */","","Parser.prototype.write = function(chunk){","  if ('header' == this.state) this.frameHeader(chunk)","  else this.frameBody(chunk);","};","","/**"," * Frame headers."," *"," * @param {Buffer} chunk"," * @api private"," */","","Parser.prototype.frameHeader = function(chunk) {","  var remaining = 4 - this.i;","","  var n = remaining &gt; chunk.length","    ? chunk.length","    : remaining;","","  // bufer","  for (var i = 0; i &lt; n; i++) {","    this.buf[this.i++] = chunk[i];","  }","","  // complete","  if (4 === this.i) {","    this.state = 'body';","    this.i = 0;","    this.headers = this.parseHeaders(this.buf);","    this.body = new Buffer(this.headers.length);","  }","","  // remaining chunks","  if (chunk.length - n) this.write(chunk.slice(n));","};","","/**"," * Frame body."," *"," * @param {Buffer} chunk"," * @api private"," */","","Parser.prototype.frameBody = function(chunk) {","  var remaining = this.headers.length - this.i;","","  var n = remaining &gt; chunk.length","    ? chunk.length","    : remaining;","","  var multipart = this.headers.meta === 0x00;","","  // bufer","  chunk.copy(this.body, this.i, 0, n);","  this.i += n;","","  // complete","  if (this.headers.length === this.i) {","    this.onmessage(this.parseBody(this.body, this.headers), multipart);","    this.reset();","  }","","  // bytes remaining","  if (chunk.length - n) this.write(chunk.slice(n));","};","","/**"," * Parsers out `meta` and `length` header octets."," *"," * @param {Buffer} buf"," * @return {Object}"," * @api private"," */","","Parser.prototype.parseHeaders = function(buf) {","  var meta = buf[0]","    , len = 0;","","  // zero out MSB","  buf[0] = 0x0;","  len = buf.readUInt32BE(0);","","  // undo side-effect","  buf[0] = meta;","","  return {","    length: len,","    meta: meta","  };","};","","/**"," * Parses out multipart messages."," *"," * @param {Buffer} buf"," * @return {Boolean} multipart"," * @api private"," */","","Parser.prototype.parseBody = function(body, headers) {","  var multipart = headers.meta === 0x00;","  var msgs = []","    , buf","    , header;","","  if (!multipart) return this.decode(body, headers.meta);","","  for (var i = 0; i &lt; body.length;) {","    header = this.parseHeaders(body.slice(i, i + 4));","    buf = body.slice(i + 4, i + header.length + 4);","    msgs.push(this.decode(buf, header.meta));","    i += header.length + 4;","  }","","  return msgs;","};","","/**"," * Apply the codec `type` to `msg`."," *"," * @param {Buffer} msg"," * @param {String} type"," * @return {Mixed} decoded message"," * @api private"," */","","Parser.prototype.decode = function(msg, type) {","  var codec = codecs.byId(type);","  return codec.decode(msg);","};","","/**"," * Set/resets to the default state."," */","","Parser.prototype.reset = function() {","  this.state = 'header';","  this.i = 0;","  this.headers = null;","  this.body = null;","};",""];
