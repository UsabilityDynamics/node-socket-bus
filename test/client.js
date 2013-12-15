/**
 * Mocha Test for daemon
 *
 * mocha test/web-socket.js --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/16/13
 * @type {Object}
 */
module.exports = {

  'WSMQ Client': {

    'can connect to server.': function( done ) {

      var Server    = require( '.' );
      var auto      = require( 'auto' );

      var server = Server.createServer({
        path: '/',
        host: 'localhost'
      });

      server.on( 'listening', function( error, server ) {
        // console.log( this.event, error, typeof server );

        var client = Server.createConnection({
          port: 80123,
          path: '/',
          host: 'localhost'
        });

        client.on( 'open', function( error, client ) {
          // console.log( 'client', this.event, error, typeof client );
        })

        // @todo First argument is the message.
        client.on( 'message', function( error, data ) {
          // console.log( 'client', this.event, !!error, typeof data );
          // console.log( error );
          done();
        });

      });

      server.on( 'connection', function( error, data ) {
        // console.log( 'server', this.event, !!error, typeof data );
      });

      server.on( 'message', function( error, data ) {
        // console.log( 'server', this.event, !!error, typeof data );
      });

    }

  }

};

// Test without mocha
// module.exports[ 'Veneer Server Prototype' ].works()
