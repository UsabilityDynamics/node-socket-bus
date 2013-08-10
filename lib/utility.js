/**
 * Helper Utility for Abstract
 *
 * @example
 *
 *    // Select specific methods to load
 *    var my_tools = WebSocketMQ.utility( 'if', 'extend', 'flatten', 'unwatch', 'watch' );
 *
 * @author potanin@UD
 * @date 6/17/13
 */
function Utility() {
  return Object.keys( arguments ) ? require( 'lodash' ).pick.apply( null, [ Utility, Array.prototype.slice.call( arguments ) ] ) : Utility;
}

Object.defineProperties( module.exports = Utility, {
  extend: {
    value: require( 'extend' ),
    enumerable: false,
    writable: true,
    configurable: true
  },
  pluck: {
    value: require( 'pluck' ),
    enumerable: true,
    configurable: true,
    writable: true
  },
  json: {
    value: require( 'abstract' ).utility.json,
    enumerable: true,
    configurable: true,
    writable: true
  }
})