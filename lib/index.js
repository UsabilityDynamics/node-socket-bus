/**
 *
 * @type {*}
 */
function WebSocket( settings, cb ) {

  // Make sure context is correct otherwise we could screw up the global scope.
  if (!(this instanceof WebSocket)) {
    return new WebSocket( options, cb );
  }

  var self         = this;
  var validation   = require( 'object-validation' );
  var msgpack      = require( 'msgpack' );
  var ws           = require( 'ws' );
  var extend       = require( 'extend' );

  // Mixin Settings and EventEmitter
  require( 'object-settings' ).mixin( this );

  // Configure instance.
  this.set({
    settings: settings,
    identity: String( process.pid ),
    retry: 100,
    max_retry: 5000
  });

  // Start WebSocket Server.
  this.Server = new ws.Server({
    host: this.get( 'settings.host', 'localhost' ),
    port: this.get( 'settings.port', 92000 ),
    path: this.get( 'settings.port', '/' )
  });

  require( 'object-emitter' ).mixin( this );

  // Handle Server Errors.
  this.Server.on( 'error', function error( error ) {

    switch( error.code ) {

      case 'EADDRINUSE': {
        self.emit( 'error.address_in_use', new Error( 'WebSocket port already used.' ) );
      } break;

    }

  });

  // Handle new Connections
  this.Server.on( 'connection', function connection( socket ) {

    // Set Unique SessionID
    socket.session = {
      key: socket.upgradeReq.headers[ 'sec-websocket-key' ],
      sid: Math.random().toString( 36 ).substring( 2 ),
      headers: socket.upgradeReq.headers,
      method: socket.upgradeReq.method,
      path: socket.upgradeReq.url
    }

    socket.send( '{"event":"handshake","sid":"' + socket.session.sid + '"}' );

    // Handle Incoming Messages.
    socket.on( 'message', function incoming( message ) {

      // Parse to JSON
      message = msgpack.unpack( message )

      // Add properties.
      _extend( message, {
        id: socket.session.id,
        session: socket.session,
        event: 'string' === typeof message ? message : message.event,
        data: message
      });

      // Expose.
      Instance.emit( 'server.message', null, message );

    });

    self.emit( 'connection', null );

  });

  // Server Bound.
  this.Server.on( 'listening', function listening() {

    // Update / Verify Settings.
    self.set( 'settings', {
      host: this._server.address().address,
      port: this._server.address().port
    });

    self.emit( 'listening', null );

  });

  // Return server instance.
  return this;

}

/**
 * WebSocket MQ Server Properties.
 *
 */
Object.defineProperties( WebSocket.prototype, {
  getQueue: {
    value: function getQueue() {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  getQueue2: {
    value: function getQueue() {},
    enumerable: true,
    configurable: true,
    writable: true
  },
})

/**
 * WebSocket MQ Constructor Properties.
 *
 */
Object.defineProperties( module.exports = WebSocket, {
  debug: {
    value: require( 'debug' )( 'websocket-mq' ),
    enumerable: true,
    configurable: true,
    writable: true
  },
  createServer: {
    value: function createServer( options, cb ) {
      return new WebSocket( options, cb );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createProxy: {
    value: function createProxy( options, cb ) {
      return new WebSocket( options, cb );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createConnection: {
    value: function createConnection( options, cb ) {

      if (!(this instanceof createConnection)) {
        return new createConnection( options, cb );
      }

      var Instance     = this;
      var validation   = require( 'object-validation' );
      var msgpack      = require( 'msgpack' );
      var ws           = require( 'ws' );
      var extend       = require( 'extend' );

      // Mixin Settings and EventEmitter
      require( 'object-settings' ).mixin( this );
      require( 'object-emitter' ).mixin( this );

      options = extend({
        host: 'localhost',
        port: 92000,
        origin: options.origin,
        passphrase: null,
        pfx: null,
        key: null,
        cert: null,
        ca: null,
      }, options )

      // Create Client Instance.
      Instance.Client = new ws.createConnection( 'http://' + options.host + ':' + options.port, {
        origin: options.origin || options.host,
        passphrase: options.passphrase,
        pfx: options.pfx,
        key: options.key
      });

      Instance.Client.on( 'open', function open() {
        require( 'object-settings' ).mixin( this );
        require( 'object-emitter' ).mixin( this );

        Instance.emit( 'open', null );

      });

      // Handle Client Errors.
      Instance.Client.on( 'error', function error( error ) {

        switch( error.code ) {

          case 'ECONNREFUSED': {
            Instance.emit( 'error.connection_refused', new Error( 'ServiceBus client could not connect to server.' ), this );
          } break;

        }

        // Expose general error.
        Instance.emit( 'error', error, this );

      });

      // Message from DSB
      Instance.Client.on( 'message', function message( message, options, buffer ) {

        if( message instanceof Buffer ) {
          message = msgpack.unpack( options.buffer )
        }

        if( 'string' === typeof message ) {
          message = { event: message }
        }

        // Emit to Root EventEmitter
        Instance.emit( 'message', null, message );

      });

      // Return client instance.
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
})