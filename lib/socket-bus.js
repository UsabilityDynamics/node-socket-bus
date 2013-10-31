/**
 * SocketBus Loader
 *
 * @param settings {Object}
 * @param callback {Function}
 *
 * @class SocketBus
 * @author potanin@UD
 *
 * @type {*}
 */
function SocketBus( settings ) {

  // Make sure context is correct otherwise we could screw up the global scope.
  if( !( this instanceof SocketBus ) ) {
    return new SocketBus( settings );
  }

  // Mixin Settings and EventEmitter
  require( 'object-settings' ).mixin( this );
  require( 'object-emitter' ).mixin( this );

  // Set Server Settings.
  this.set( 'settings', {
    host: 'localhost',
    port: 9130,
    vhost: ''
  });

  Object.defineProperties( module, {
    instances: {
      value: {},
      writable: true
    }
  });

  // @chainable
  return this;

}

/**
 * Instance Properties.
 *
 */
Object.defineProperties( SocketBus.prototype, {
  bind: {
    value: require( './server' ).create,
    enumerable: true,
    writable: true
  },
  connect: {
    /**
     * Create WebSocket Client.
     *
     * @param options
     * @param cb
     * @returns {Client}
     */
    value: require( './client' ).create,
    enumerable: true,
    configurable: true,
    writable: true
  },
  channel: {
    value: null,
    enumerable: true,
    writable: true
  },
  publich: {
    value: null,
    enumerable: true,
    writable: true
  },
  subscribe: {
    value: null,
    enumerable: true,
    writable: true
  },
  unsubscribe: {
    value: null,
    enumerable: true,
    writable: true
  },
  configure: {
    /**
     * Configure
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
        this.on( 'ready', fn.bind( this, this ) );
      }

      return this;

    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  utility: {
    value: {
      defaults: require( 'abstract' ).utility.defaults,
      extend: require( 'abstract' ).utility.extend,
    },
    configurable: true,
    writable: true
  }
});

/**
 * Constructor Properties.
 *
 */
Object.defineProperties( module.exports = SocketBus, {
  create: {
    /**
     * Create New Instance
     *
     * @param options
     * @returns {SocketBus}
     */
    value: function create( options) {
      return new SocketBus( options );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  debug: {
    value: require( 'debug' )( 'wsmq' ),
    enumerable: false,
    configurable: true,
    writable: true
  }
});


