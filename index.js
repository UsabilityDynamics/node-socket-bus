/**
 * Run Coverage Tests / Module
 *
 * @author potanin@UD
 * @date 6/18/13
 */
module.exports = process.env.APP_COVERAGE ? require( './static/lib-cov/websocket-mq' ) : require( './lib/websocket-mq' );
