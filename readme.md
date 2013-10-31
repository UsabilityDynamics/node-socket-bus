## Overview
This module is not intended to be a high-traffic message-queue and distribution hub.
It is intended to provide cross-process event distribution that can later be extended to utilize a third-party MQ system as well.

 - WebSocket powered Message Distribution.
 - Bridges the gap between the basic EventEmitter and advanced MQ systems.
 - Peristen queue and message handling when using together with Rabbit module and RabbitMQ.
 - Messages (events) are published (emitted) to channels, which can be predefined in package.json.
 - Certain important messages are persistent and will be held for delivery to subscribers. This should be a channel-wide setting.
 - With certain messages receipt-acknowledgement is important to the publisher in which case consumers' receipt will be tracked.
 - When distributing work (RPC) a callback will be necessary to deliver a result back to the client.

## Channel Types
All channels support "topics" via the use of wilrcards and hash tags.
Mesage peristency can be configured on a message-by-message basis.

 - req-rep - Each message is delivered to eactly one worker, commonly known as a work-queue.
 - push-pull - Delivery of messages will be queued during disconnects and sent again upon the next connection.
 - pub-sub - Messages are delivered to multiple consumers.

## Uage

  SocketBus.bind({
    identity: 'some-service',
    port: 5000,
    host: 'localhost'
  });

  SocketBus.channel( 'updates.important', {
    persistent: true,
    acknowledge: true
  });

  SocketBus.publish( 'user.register', {
    name: "John",
    address: "United States"
  }, callback );

  SocketBus.publish( 'case-vote', {
    name: "tobi",
    vote: 30
  });

  SocketBus.subscribe( 'important.events', function( data ) {
    console.log( '%s signed in', user.name );
  });

  SocketBus.subscribe( 'rpc.*', function( data ) {
    console.log( '%s signed in', user.name );
  });

  SocketBus.subscribe( 'rpc.queue', function( workload ) {
    this.topic; this.done();
  });

  // Remove subscription, only necessary when peristency was earlier enabled.
  SocketBus.unsubscribe( 'rpc.*' );

## Advanced Usage

  // Configure Settings.
  SocketBus.set( 'defaults', {
    name: 'john',
    timeout: 5000
  });

  // Configure Advanced Channel
  SocketBus.channel( 'rpc.queue', {
    type: 'json',
    delivery: 'round-robin',
    persist: true
    deliveryMode: 2,
  });

  // Publish Advanced Message
  SocketBus.publish({
    id: 100,
    type: 'validation',
    timeout: 4000
  });

  // Write to console.
  SocketBus.subscribe( 'job.load', loadWorker );
  SocketBus.subscribe( 'job.analyze', analysisWorker );
  SocketBus.subscribe( 'job.print', printWorker );

  // Connect to other MQ providers
  SocketBus.bind({
    port: 9600,
    certificate: '../public.crt'
  });

## License

(The MIT License)

Copyright (c) 2013 Usability Dynamics, Inc. &lt;info@usabilitydynamics.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.