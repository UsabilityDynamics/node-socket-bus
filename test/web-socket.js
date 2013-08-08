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

  'Veneer WebSocket Prototype': {

    'works': function( done ) {
      var WebSocket   = require( '../' );
      var auto        = require( 'auto' );

      var server = WebSocket.createServer({
        path: '/',
        host: 'localhost'
      });

      server.on( 'listening', function( error, server ) {
        // console.log( this.event, error, typeof server );

        var client = WebSocket.createConnection({
          port: 80123,
          path: '/',
          host: 'localhost'
        });

        client.on( 'open', function( error, client ) {
          // console.log( this.event, error, typeof client );
        })

        client.on( 'message', function( error, data ) {
          // console.log( this.event, error, data );
          done();
        });

      });

      server.on( 'connection', function( error, data ) {
        // console.log( this.event, error, typeof data );
      });

      server.on( 'message', function( error, data ) {
        // console.log( this.event, error, typeof data );
      });


    }

  }

};

// Test without mocha
// module.exports[ 'Veneer WebSocket Prototype' ].works()
