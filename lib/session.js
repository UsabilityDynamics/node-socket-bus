/**
 * Session Builder
 *
 * @param client
 * @returns {Session}
 * @constructor
 */
function Session( client ) {

  // Make sure context is correct otherwise we could screw up the global scope.
  if( this.constructor.name != 'Session' ) {
    return new Session( client );
  }

  // Enable session-specific storage.
  require( 'object-settings' ).mixin( this );

  // Computed Session Keys.
  Object.defineProperties( this, {
    key: {
      value: client.upgradeReq.headers[ 'sec-webclient-key' ],
      enumerable: true
    },
    sid: {
      value: Math.random().toString( 36 ).substring( 2 ),
      enumerable: true
    },
    headers: {
      value: client.upgradeReq.headers,
      enumerable: true
    },
    method: {
      value: client.upgradeReq.method,
      enumerable: true
    },
    path: {
      value: client.upgradeReq.url,
      enumerable: true
    }
  });

  // Bind Event Handlers.
  client.on( 'open', this.open );
  client.on( 'message', this.message );
  client.on( 'close', this.close );
  client.on( 'ping', this.close );
  client.on( 'pong', this.close );
  client.on( 'error', this.close );

  // @chainable
  return this;

}

/**
 * Instance Properties.
 *
 */
Object.defineProperties( Session.prototype, {
  configure: {
    /**
     * Configure Session
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
        this.on( 'open', fn.bind( this, this ) );
      }

      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  message: {
    value: function message( data, flags ) {
      Session.debug( 'this.message', arguments );

      // Parse to JSON
      if( message instanceof Buffer ) {
        message = msgpack.unpack( settings.buffer )
      }

      // Add properties.
      Session.utility.extend( message, {
        sid: this.sid,
        key: this.key,
        event: 'object' === typeof message && message.event ? message.event : message,
        data: message
      });

      // Expose.
      // this.emit( 'message', null, message, client, this.Server );

      // @chainable
      return this;

    },
    enumerable: false,
    writable: true,
    configurable: true
  },
  open: {
    value: function open() {
      Session.debug( 'this.open', arguments );
    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  close: {
    value: function close() {
      Session.debug( 'this.close', arguments );


    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  error: {
    value: function ping( error ) {
      Session.debug( 'this.error', arguments );

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  ping: {
    value: function ping( data, flags ) {
      Session.debug( 'this.ping', arguments );

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  },
  pong: {
    value: function pong( data, flags ) {
      Session.debug( 'this.pong', arguments );

      // @chainable
      return this;

    },
    enumerable: false,
    configurable: true,
    writable: true
  }
})

/**
 * Constructor Properties.
 *
 */
Object.defineProperties( module.exports = Session, {
  create: {
    value: function create( client ) {
      return new Session( client );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  debug: {
    value: require( 'debug' )( 'wsmq:session' ),
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