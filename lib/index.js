/**
 *
 * @type {*}
 */
function WebSocket( settings, cb ) {

  // Make sure context is correct otherwise we could screw up the global scope.
  if (!(this instanceof WebSocket)) {
    return new WebSocket( options, cb );
  }

  var Instance     = this;
  var msgpack      = require( 'msgpack' );
  var ws           = require( 'ws' );
  var extend       = require( 'extend' );

  // Mixin Settings and EventEmitter
  require( 'object-settings' ).mixin( Instance );
  require( 'object-emitter' ).mixin( Instance );
  require( 'object-emitter' ).inject( ws.Server.prototype );

  // Configure instance.
  Instance.set({
    settings: settings,
    identity: String( process.pid ),
    retry: 100,
    max_retry: 5000
  });

  // Start WebSocket Server.
  Instance.Server = new ws.Server({
    host: Instance.get( 'settings.host', 'localhost' ),
    port: Instance.get( 'settings.port', 80123 ),
    path: Instance.get( 'settings.port', '/' )
  });

  // Handle Server Errors.
  Instance.Server.on( 'error', function error( error ) {

    switch( error.code ) {

      case 'EACCES': {
        Instance.Server.emit( 'error.unable_to_bind', new Error( 'WebSocket can not bind.' ) );
      } break;

      case 'EADDRINUSE': {
        Instance.Server.emit( 'error.address_in_use', new Error( 'WebSocket port already used.' ) );
      } break;

    }

  });

  // Handle new Connections
  Instance.Server.on( 'connection', function connection( socket ) {

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
      if( message instanceof Buffer ) {
        message = msgpack.unpack( options.buffer )
      }

      // Add properties.
      extend( message, {
        id: socket.session.id,
        session: socket.session,
        event: 'string' === typeof message ? message : message.event,
        data: message
      });

      // Expose.
      // Instance.emit( 'server.message', null, message );

    });

  });

  // Server Bound.
  Instance.Server.on( 'listening', function listening() {

    // Update / Verify Settings.
    Instance.set( 'settings', {
      host: this._server.address().address,
      port: this._server.address().port
    });

    if( 'function' === typeof cb ) {
      cb( null, this );
    }

  });

  // Merge Server events into instance.
  extend( Instance._events, Instance.Server._events );

  // Return server instance.
  return Instance;

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
  createBroker: {
    value: function getQueue() {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  subscribe: {
    value: function getQueue() {},
    enumerable: true,
    configurable: true,
    writable: true
  },
  send: {
    value: function getQueue() {},
    enumerable: true,
    configurable: true,
    writable: true
  }
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
      require( 'object-emitter' ).inject( ws.prototype );

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
        // Instance.emit( 'open', null );
      });

      // Handle Client Errors.
      Instance.Client.on( 'error', function error( error ) {

        switch( error.code ) {

          case 'ECONNREFUSED': {
            Instance.emit( 'error.connection_refused', new Error( 'ServiceBus client could not connect to server.' ), this );
          } break;

        }

        // Expose general error.
        // Instance.emit( 'error', error, this );

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
        // Instance.emit( 'message', null, message );

      });

      // Merge Server events into instance.
      extend( Instance._events, Instance.Client._events );

      // Return client instance.
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
})

