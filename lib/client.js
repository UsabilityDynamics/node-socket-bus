/**
 *
 * @type {*}
 */
function Client( settings, cb ) {

  if (!(this instanceof Client)) {
    return new Client( options, cb );
  }

  var Instance     = this;

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
  Instance.Client = new Client.ws.createConnection( 'http://' + options.host + ':' + options.port, {
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

}

/**
 * WebSocket MQ Server Properties.
 *
 */
Object.defineProperties( Client.prototype, {
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
Object.defineProperties( module.exports = Client, {
  ws: {
    value: require( 'ws' ),
    enumerable: false,
    writable: true,
    configurable: true
  },
  amqp: {
    value: require( 'amqp' ),
    enumerable: false,
    writable: true,
    configurable: true
  },
  debug: {
    value: require( 'debug' )( 'websocket-mq' ),
    enumerable: false,
    configurable: true,
    writable: true
  },
  debug: {
    value: require( 'debug' )( 'wsmq:client' ),
    enumerable: false,
    configurable: true,
    writable: true
  },
  utility: {
    value: require( './utility' ),
    configurable: true,
    enumerable: false,
    writable: true
  },
  createConnection: {
    /**
     * Create WebSocket Client.
     *
     * @param options
     * @param cb
     * @returns {Client}
     */
    value: function createConnection( options, cb ) {
      return new Client( options, cb );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  createClient: {
    /**
     * Create WebSocket Client.
     *
     * @param options
     * @param cb
     * @returns {Client}
     */
    value: function createClient( options, cb ) {
      return new Client( options, cb );
    },
    enumerable: false,
    configurable: true,
    writable: true
  }
})

