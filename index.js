#!/usr/bin/env node
module.exports = process.env.APP_COVERAGE ? require( './static/codex/lib-cov/socket-bus' ) : require( './lib/socket-bus' );
