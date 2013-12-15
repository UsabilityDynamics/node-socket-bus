var SocketBus = require( '.' );

// Allow access to our queues
SocketBus.bind( 'localhos:9000' );

// Connect to our cluster
SocketBus.connect([
  'localhost:9100',
  'localhost:9200',
  'localhost:9300'
]);

// Define a channel using a schema
SocketBus.channel({
  name: "crm.sales",
  type: "queue",
  schema: require( 'sales-schema' )
});

// Subscribe and allocate workers
SocketBus.subscribe({
  "crm.refunds":  ProcessRefunds,
  "crm.quotes":   GenerateQuote,
  "crm.sales":    RecordSales,
});

// Publish a message and forget about it.
SocketBus.publish( 'system.log', 'Verified compliencey, no issues found.' );

// Publish messages and await a response
SocketBus.publish( 'enterprise-services.quote', quote.toJSON(), HandleResponse );

// Monitor cluster
SocketBus.get( 'active-workers', function( error, result ) {
  console.log( error || result );
});