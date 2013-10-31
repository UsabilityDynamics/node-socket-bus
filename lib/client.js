/**
 * WebSocket Client
 *
 * ### Events
 * - error
 *
 * @param settings {Object}
 * @param callback {Function}
 *
 * @type {*}
 */
function Client( settings ) {

  // Make sure context is correct otherwise we could screw up the global scope.
  if (!(this instanceof Client)) {
    return new Client( settings );
  }

  // Mixin Settings and EventEmitter
  require( 'object-settings' ).mixin( this );
  require( 'object-emitter' ).mixin( this );

  // Set Client Settings.
  this.set({
    settings: Client.utility.defaults( settings, {
      host: 'localhost',
      port: 92000,
      origin: '',
      passphrase: null,
      pfx: null,
      key: null,
      cert: null,
      ca: null,
    }),
    identity: String( process.pid )
  });

  // Create Client instance.
  Object.defineProperties( this, {
    Client: {
      value: require( 'ws' ).createConnection( 'http://' + this.get( 'settings.host' ) + ':' + this.get( 'settings.port' ), {
        origin: this.get( 'settings.origin' ) || this.get( 'settings.origin' ),
        passphrase: this.get( 'settings.passphrase' ),
        pfx: this.get( 'settings.pfx' ),
        key: this.get( 'settings.key' )
      }),
      writable: true,
      enumerable: false,
      configurable: true
    },
    _events: {
      value: this._events,
      configurable: true,
      writable: true,
      enumerable: false
    },
    event: {
      configurable: true,
      enumerable: true,
      writable: true
    }
  });

  setTimeout( function() {

    this.send( Date.now().toString(), {mask: true} )

  }.bind( this.Client ), 100 )


  // Event Handlers.
  this.Client.on( 'open', this.open.bind( this ) );
  this.Client.on( 'close', this.close.bind( this ) );
  this.Client.on( 'message', this.message.bind( this ) );
  this.Client.on( 'ping', this.ping.bind( this ) );
  this.Client.on( 'error', this.error.bind( this ) );
  this.Client.on( 'data', this.data.bind( this ) );

  // @chainable
  return this;

}

/**
 * Instance Properties.
 *
 */
Object.defineProperties( Client.prototype, {
  configure: {
    /**
     * Configure Client
     *
     * Method executed when connection is open.
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
        this.on( 'open', fn.bind( this, this ) );
      }

      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  open: {
    value: function open() {
      Client.debug( 'this.open' );


      // this.Client
      // Emit
      this.emit( 'open', null, this.Client._socket, this.Client );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  close: {
    value: function close( ) {
      Client.debug( 'this.close', arguments );

      // Emit
      this.emit( 'close', null, this.Client );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  message: {
    value: function message( message, settings, buffer  ) {
      Client.debug( 'this.message', message, settings, buffer );

      if( message instanceof Buffer ) {
        // message = msgpack.unpack( settings.buffer )
      }

      if( 'string' === typeof message ) {
        /// message = { event: message }
      }

      // Emit to Root EventEmitter
      this.emit( 'message', null, message, settings, buffer );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  data: {
    value: function data( data ) {
      Client.debug( 'this.data', arguments );

      // Emit
      this.emit( 'data', null, data, this.Client );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  ping: {
    value: function ping( data, flags ) {
      Client.debug( 'this.ping', data, flags );

      // Emit
      this.emit( 'ping', null, data, flaws, this.Client );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  error: {
    value: function error( error ) {

      // Handle known errors.
      switch( error.code ) {

        case 'ECONNREFUSED': {
          this.emit( 'error.connection_refused', new Error( 'Client could not connect to server.' ), this.Server );
        } break;

      }

      // Emit
      this.emit( 'error', error, this.Client );

      // @chainable
      return this;

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  send: {
    value: function send( data, options, cb ) {

      var WebSocket = this.Client;
      // console.log( 'this.readyState', this.Client.readyState );
      // console.log( 'WebSocket.OPEN', WebSocket.OPEN );

      //console.log( this.Client._sender );
      //return;
      //this.Client._sender.send(data, options, cb);

      //console.log( this.Client.readyState );
      // require( 'ws' ).prototype.send.bind( this.Client )( 'asdf' );
      // require( 'ws' ).prototype.send.call( this.Client, data, options, function sent( error ) {});

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});

/**
 * Constructor Properties.
 *
 */
Object.defineProperties( module.exports = Client, {
  create: {
    /**
     * Create WebSocket Client.
     *
     * @param settings
     *
     * @returns {Client}
     */
    value: function create( settings ) {
      return new Client( settings );
    },
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
    value: {
      defaults: require( 'abstract' ).utility.defaults,
      extend: require( 'abstract' ).utility.extend,
    },
    configurable: true,
    writable: true
  }
})

