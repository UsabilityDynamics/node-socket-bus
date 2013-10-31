/**
 * WebSocket Server
 *
 * ### Events
 * - connection
 * - connection.success
 * - connection.error
 *
 * @param settings {Object}
 *
 * @type {*}
 */
function Server( settings ) {

  // Make sure context is correct otherwise we could screw up the global scope.
  if( this.constructor.name != 'Server' ) {
    return new Server( settings );
  }

  // Mixin Settings and EventEmitter
  require( 'object-settings' ).mixin( this );
  require( 'object-emitter' ).mixin( this );

  // Set Server Settings.
  this.set({
    settings: Server.utility.defaults( settings, {
      host: 'localhost',
      port: 80123,
      path: '/',
      origin: '',
      passphrase: null,
      pfx: null,
      key: null,
      cert: null,
      ca: null
    }),
    identity: String( process.pid )
  });

  // Define dynamic properties.
  Object.defineProperties( this, {
    Session: {
      value: require( './session' ),
      enumerable: false,
      configurable: false,
      writable: true
    },
    Server: {
      value: require( 'ws' ).createServer({
        host: this.get( 'settings.host' ),
        port: this.get( 'settings.port' ),
        path: this.get( 'settings.path' )
      }),
      enumerable: false,
      writable: true,
    },
    _events: {
      configurable: true,
      enumerable: false,
      writable: true
    },
    event: {
      configurable: true,
      enumerable: true,
      writable: true
    }
  })

  // Event Handlers.
  this.Server.on( 'listening', this.listening.bind( this ) );
  this.Server.on( 'connection', this.connection.bind( this ) );
  this.Server.on( 'headers', this.headers.bind( this ) );
  this.Server.on( 'error', this.error.bind( this ) );

  // @chainable
  return this;

}

/**
 * Instance Properties.
 *
 */
Object.defineProperties( Server.prototype, {
  configure: {
    /**
     * Configure Server
     *
     * Method executed when connection is ready.
     * Usage and semantics emulating Express.
     *
     * @param env
     * @param fn
     * @returns {*}
     */
    value: function configure( env, fn ) {
      var envs      = 'all';
      var args      = [].slice.call(arguments);

      fn = args.pop();

      if( args.length ) {
        envs = args;
      }

      if( 'all' == envs || ~envs.indexOf( this.get( 'environment' ) ) ) {
        this.on( 'listening', fn.bind( this, this ) );
      }

      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  connection: {
    value: function connection( client ) {
      Server.debug( 'this.connection', typeof client );

      // Build Session
      client.session = require( './session' ).create( client );

      // New session created.
      this.emit( 'session', null, client.session, client, this.Server );

      // Emit
      this.emit( 'connection', null, client, this.Server );

      // @chainable
      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  error: {
    value: function error( reason, errorCode ) {
      Server.debug( 'this.eror', error );

      // Handle known errors.
      switch( error.code ) {

        case 'EACCES': {
          this.emit( 'error.unable_to_bind', new Error( 'Server can not bind.' ), this.Server );
        } break;

        case 'EADDRINUSE': {
          this.emit( 'error.address_in_use', new Error( 'Server port already used.' ), this.Server );
        } break;

      }

      // Emit
      this.emit( 'error', error, this.Server );

      // @chainable
      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  listening: {
    value: function listening() {
      Server.debug( 'bound to %s:%s.', this.Server._server.address().address, this.Server._server.address().port );

      // Update / Verify Settings.
      this.set( 'settings', {
        host: this.Server._server.address().address,
        port: this.Server._server.address().port
      });

      // Emit
      this.emit( 'listening', null, this.Server._server.address(), this.Server );

      // @chainable
      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  headers: {
    value: function headers( headers ) {
      Server.debug( 'this.headers', headers );

      // Emit
      this.emit( 'headers', null, headers, this.Server );

      // @chainable
      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  getQueue: {
    value: function getQueue() {},
    enumerable: true,
    configurable: true,
    writable: true
  }
});

/**
 * Constructor Properties.
 *
 */
Object.defineProperties( module.exports = Server, {
  create: {
    value: function create( settings ) {
      return new Server( settings );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  debug: {
    value: require( 'debug' )( 'wsmq:server' ),
    enumerable: false,
    configurable: true,
    writable: true
  },
  utility: {
    value: {
      defaults: require( 'abstract' ).utility.defaults,
      extend: require( 'abstract' ).utility.extend,
    },
    configurable: true,
    writable: true
  }
})

