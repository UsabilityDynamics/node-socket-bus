var wsmq = require( '../' );


// Server Bound.
wsmq.createServer({ port: 9600 }).configure( function( error, socket, client ) {

  // Session Started.
  this.on( 'session', function( error, session, client ) {

    // Send message to Session.
    client.send({
      nmae: "Andy",
      message: "Hola!"
    });

    // Console responses.
    client.on( 'message', console.log );

  });

});

// Client Connected.
wsmq.createConnection({ port: 9600 }).configure( function( error, socket, client ) {

  // Incoming Messages.
  this.on( 'message', console.log );

});

// server.on( '*', function( error, data ) { console.log( 'server', this.event, error || data ); })
// client.on( '*', function( error, data ) { console.log( 'client', this.event, error || data ) })

