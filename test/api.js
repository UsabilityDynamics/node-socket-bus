/**
 * API Tests
 *
 * mocha test/api.js --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/16/13
 * @type {Object}
 */
module.exports = {

  'WebSocket-MQ API': {

    'works': function( ) {

      var WSMQ   = require( '.' );

      // Constructor.
      WSMQ.should.have.property( 'debug' );
      WSMQ.should.have.property( 'utility' );
      WSMQ.should.have.property( 'createServer' );
      WSMQ.should.have.property( 'createProxy' );
      WSMQ.should.have.property( 'createConnection' );
      WSMQ.should.have.property( 'createClient' );

    }

  }

};

// Test without mocha
// module.exports[ 'Veneer WebSocket Prototype' ].works()
